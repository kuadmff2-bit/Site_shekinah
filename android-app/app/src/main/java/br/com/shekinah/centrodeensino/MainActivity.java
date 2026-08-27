package br.com.shekinah.centrodeensino;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Locale;

public class MainActivity extends Activity {
    private static final String SITE_URL = "https://site-shekinah.kuadmff2.workers.dev";
    private static final String SITE_HOST = "site-shekinah.kuadmff2.workers.dev";

    private WebView webView;
    private ProgressBar progressBar;
    private View launchPanel;
    private View errorPanel;
    private TextView errorMessage;
    private boolean mainPageFailed;

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.web_view);
        progressBar = findViewById(R.id.progress_bar);
        launchPanel = findViewById(R.id.launch_panel);
        errorPanel = findViewById(R.id.error_panel);
        errorMessage = findViewById(R.id.error_message);
        Button retryButton = findViewById(R.id.retry_button);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setUserAgentString(settings.getUserAgentString() + " ShekinahAndroid/1.0");

        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, false);

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progressBar.setProgress(newProgress);
                progressBar.setVisibility(newProgress < 100 ? View.VISIBLE : View.GONE);
            }
        });

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                mainPageFailed = false;
                showWebsite();
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                if (!mainPageFailed) {
                    launchPanel.setVisibility(View.GONE);
                    showWebsite();
                }
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleNavigation(request.getUrl());
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request.isForMainFrame()) {
                    mainPageFailed = true;
                    String description = error.getDescription() == null
                        ? getString(R.string.connection_error)
                        : error.getDescription().toString();
                    showError(description);
                }
            }
        });

        retryButton.setOnClickListener(view -> {
            launchPanel.setVisibility(View.VISIBLE);
            showWebsite();
            webView.loadUrl(SITE_URL);
        });

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                android.window.OnBackInvokedDispatcher.PRIORITY_DEFAULT,
                this::handleBackNavigation
            );
        }

        if (savedInstanceState == null || webView.restoreState(savedInstanceState) == null) {
            webView.loadUrl(SITE_URL);
        }
    }

    private boolean handleNavigation(Uri uri) {
        if (uri == null) {
            return false;
        }

        String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase(Locale.ROOT);
        String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase(Locale.ROOT);

        if ("https".equals(scheme) && SITE_HOST.equals(host)) {
            return false;
        }

        if ("intent".equals(scheme)) {
            return openIntentUrl(uri.toString());
        }

        if ("http".equals(scheme) || "https".equals(scheme)
            || "mailto".equals(scheme) || "tel".equals(scheme)
            || "sms".equals(scheme) || "geo".equals(scheme)
            || "whatsapp".equals(scheme)) {
            openExternal(uri);
            return true;
        }

        return false;
    }

    private boolean openIntentUrl(String url) {
        try {
            Intent intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
            intent.addCategory(Intent.CATEGORY_BROWSABLE);
            intent.setComponent(null);
            startActivity(intent);
        } catch (Exception exception) {
            Toast.makeText(this, R.string.no_app_available, Toast.LENGTH_SHORT).show();
        }
        return true;
    }

    private void openExternal(Uri uri) {
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.addCategory(Intent.CATEGORY_BROWSABLE);
        try {
            startActivity(intent);
        } catch (ActivityNotFoundException exception) {
            Toast.makeText(this, R.string.no_app_available, Toast.LENGTH_SHORT).show();
        }
    }

    private void showWebsite() {
        errorPanel.setVisibility(View.GONE);
        webView.setVisibility(View.VISIBLE);
    }

    private void showError(String detail) {
        launchPanel.setVisibility(View.GONE);
        webView.setVisibility(View.INVISIBLE);
        errorMessage.setText(getString(R.string.connection_error_detail, detail));
        errorPanel.setVisibility(View.VISIBLE);
        progressBar.setVisibility(View.GONE);
    }

    private void handleBackNavigation() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            finish();
        }
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        handleBackNavigation();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onResume() {
        super.onResume();
        webView.onResume();
    }

    @Override
    protected void onPause() {
        webView.onPause();
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        webView.stopLoading();
        webView.setWebChromeClient(null);
        webView.setWebViewClient(null);
        webView.destroy();
        super.onDestroy();
    }
}

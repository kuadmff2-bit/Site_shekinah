plugins {
    id("com.android.application")
}

android {
    namespace = "br.com.shekinah.centrodeensino"
    compileSdk = 36

    defaultConfig {
        applicationId = "br.com.shekinah.centrodeensino"
        minSdk = 24
        targetSdk = 36
        versionCode = 2
        versionName = "1.1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

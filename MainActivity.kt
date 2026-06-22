package com.minamar7.staysafetipselite

import android.content.Context
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.billingclient.api.*
// --- ADMOB IMPORTS ---
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback
import com.google.android.gms.ads.FullScreenContentCallback

class MainActivity : AppCompatActivity() {

    private lateinit var billingClient: BillingClient
    private lateinit var webView: WebView
    // --- ΜΕΤΑΒΛΗΤΗ ΓΙΑ ΤΗ ΔΙΑΦΗΜΙΣΗ ---
    private var mInterstitialAd: InterstitialAd? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // --- 1. ΑΡΧΙΚΟΠΟΙΗΣΗ GOOGLE MOBILE ADS SDK ---
        MobileAds.initialize(this) {}

        // --- 2. WEBVIEW SETUP (FULL SCREEN) ---
        webView = findViewById(R.id.webview)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        
        // Αλλαγή σε "Android" για να ταιριάζει με το window.Android του HTML
        webView.addJavascriptInterface(WebAppInterface(), "Android")
        
        webView.webViewClient = WebViewClient()
        webView.loadUrl("https://minamar7.github.io/StaySafeTips/")

        // --- 3. GOOGLE PLAY BILLING SETUP ---
        setupBillingClient()

        // --- 4. ΦΟΡΤΩΣΗ ΔΙΑΦΗΜΙΣΗΣ ADMOB ---
        loadInterstitialAd()
    }

    // --- ENHANCED INTERFACE BRIDGE FOR HTML ---
    inner class WebAppInterface {
        @JavascriptInterface
        fun startPurchase(planId: String) {
            runOnUiThread {
                launchBillingFlow(planId)
            }
        }

        // --- Ακούει το κουμπί "I HAVE ARRIVED SAFELY" ---
        @JavascriptInterface
        fun onSafeArrival() {
            runOnUiThread {
                if (mInterstitialAd != null) {
                    // Ορισμός Callback: Τι γίνεται όταν κλείσει η διαφήμιση
                    mInterstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                        override fun onAdDismissedFullScreenContent() {
                            mInterstitialAd = null
                            loadInterstitialAd() // Προετοιμασία επόμενης διαφήμισης
                            webView.loadUrl("javascript:showSuccess()") // Επιστροφή στο HTML για το Success Screen
                        }
                    }
                    // Εμφάνιση της διαφήμισης
                    mInterstitialAd?.show(this@MainActivity)
                } else {
                    // Αν δεν πρόλαβε να φορτώσει, δείξε απευθείας την επιτυχία
                    webView.loadUrl("javascript:showSuccess()")
                }
            }
        }
    }

    // --- ΣΥΝΑΡΤΗΣΗ ΦΟΡΤΩΣΗΣ ΔΙΑΦΗΜΙΣΗΣ ---
    private fun loadInterstitialAd() {
        val adRequest = AdRequest.Builder().build()
        // Χρησιμοποιούμε το δοκιμαστικό ID της Google για interstitials κατά τις δοκιμές.
        InterstitialAd.load(this, "ca-app-pub-3940256099942544/1033173712", adRequest,
            object : InterstitialAdLoadCallback() {
                override fun onAdFailedToLoad(adError: LoadAdError) {
                    mInterstitialAd = null
                }
                override fun onAdLoaded(interstitialAd: InterstitialAd) {
                    mInterstitialAd = interstitialAd
                }
            })
    }

    private fun setupBillingClient() {
        billingClient = BillingClient.newBuilder(this)
            .setListener { billingResult, purchases ->
                if (billingResult.responseCode == BillingClient.BillingResponseCode.OK && purchases != null) {
                    Toast.makeText(this, "Elite Status Activated!", Toast.LENGTH_LONG).show()
                    webView.loadUrl("javascript:paymentSuccess()") 
                }
            }
            .enablePendingPurchases()
            .build()

        billingClient.startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(billingResult: BillingResult) {}
            override fun onBillingServiceDisconnected() {}
        })
    }

    private fun launchBillingFlow(planId: String) {
        Toast.makeText(this, "Connecting to Google Play: $planId", Toast.LENGTH_SHORT).show()
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}

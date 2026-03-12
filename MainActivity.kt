/* * Repository: https://minamar7.github.io/StaySafeTips/
 * Stay Safe Elite - Android Application Logic
 * Package Name: com.staysafetips.elite
 */

package com.staysafetips.elite

import android.content.Context
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.billingclient.api.*

class MainActivity : AppCompatActivity() {

    private lateinit var billingClient: BillingClient
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // --- 1. WEBVIEW SETUP (FULL SCREEN) ---
        webView = findViewById(R.id.webview)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        
        // Σύνδεση με το Paywall του HTML
        webView.addJavascriptInterface(WebAppInterface(), "AndroidInterface")
        
        webView.webViewClient = WebViewClient()
        webView.loadUrl("https://minamar7.github.io/StaySafeTips/")

        // --- 2. GOOGLE PLAY BILLING SETUP ---
        setupBillingClient()
    }

    // --- INTERFACE BRIDGE FOR HTML (Ο κώδικας που καλεί το κουμπί σου) ---
    inner class WebAppInterface {
        @JavascriptInterface
        fun startPurchase(planId: String) {
            runOnUiThread {
                launchBillingFlow(planId)
            }
        }
    }

    private fun setupBillingClient() {
        billingClient = BillingClient.newBuilder(this)
            .setListener { billingResult, purchases ->
                // Αν η πληρωμή πετύχει
                if (billingResult.responseCode == BillingClient.BillingResponseCode.OK && purchases != null) {
                    Toast.makeText(this, "Elite Status Activated!", Toast.LENGTH_LONG).show()
                    webView.loadUrl("javascript:paymentSuccess()") // Ξεκλειδώνει το site
                }
            }
            .enablePendingPurchases()
            .build()

        billingClient.startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(billingResult: BillingResult) {
                // Έτοιμο για αγορές
            }
            override fun onBillingServiceDisconnected() {
                // Επανασύνδεση αν κοπεί το ίντερνετ
            }
        })
    }

    private fun launchBillingFlow(planId: String) {
        // Εδώ η Google αναλαμβάνει τη χρέωση
        Toast.makeText(this, "Connecting to Google Play: $planId", Toast.LENGTH_SHORT).show()
        
        // Σημείωση: Εδώ θα προστεθεί το SKU details logic μόλις φτιάξεις τα προϊόντα στο Console
    }

    // Διαχείριση του Back Button για να μην κλείνει το app κατά λάθος
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}

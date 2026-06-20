package com.staysafetips.elite

import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import com.samsung.android.sdk.iap.lib.helper.IapHelper

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var iapHelper: IapHelper

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Αρχικοποίηση Samsung IAP
        iapHelper = IapHelper.getInstance(this)
        iapHelper.setOperationMode(IapHelper.OperationMode.PRODUCTION)

        webView = WebView(this)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        
        // Σημαντικό: Για να ανοίγουν τα links μέσα στο app και όχι στον browser
        webView.webViewClient = WebViewClient()

        // Σύνδεση με το JavaScript του site σου
        webView.addJavascriptInterface(AndroidInterface(), "AndroidInterface")

        // Φόρτωση του site
        webView.loadUrl("https://minamar7.github.io/StaySafeTips/")
        setContentView(webView)
    }

    inner class AndroidInterface {
        @JavascriptInterface
        fun startSamsungPurchase(itemId: String) {
            runOnUiThread {
                // itemId: Το ID προϊόντος που έβαλες στο Samsung Seller Portal
                iapHelper.startPayment(itemId, true) { iapResult, purchaseVo ->
                    if (iapResult.isSuccess) {
                        // Ενημέρωση του site για επιτυχημένη πληρωμή
                        webView.loadUrl("javascript:paymentSuccess('${purchaseVo.itemId}')")
                    } else {
                        // Ενημέρωση για αποτυχία
                        webView.loadUrl("javascript:paymentError('${iapResult.errorString}')")
                    }
                }
            }
        }
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}

/* * Repository: https://minamar7.github.io/StaySafeTips/
 * Stay Safe Elite - Android Application Logic with Google Play Billing
 */

package com.staysafetips.elite

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.telephony.TelephonyManager
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.billingclient.api.*
import org.json.JSONObject

class MainActivity : AppCompatActivity() {

    private lateinit var billingClient: BillingClient
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // --- WEBVIEW SETUP ---
        webView = findViewById(R.id.webview) // Πρέπει να υπάρχει στο activity_main.xml
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.addJavascriptInterface(WebAppInterface(), "AndroidInterface")
        webView.webViewClient = WebViewClient()
        webView.loadUrl("https://minamar7.github.io/StaySafeTips/")

        // --- EMERGENCY LOGIC ---
        val countryCode = getCountryCode()
        val jsonData = loadJSONFromAsset("emergency_data.json")
        if (jsonData != null) {
            val numbers = parseEmergencyNumbers(jsonData, countryCode)
            updateUI(numbers)
        }

        // --- GOOGLE PLAY BILLING SETUP ---
        setupBillingClient()
    }

    // --- INTERFACE BRIDGE FOR HTML ---
    inner class WebAppInterface {
        @JavascriptInterface
        fun startPurchase(planId: String) {
            // Αυτή η συνάρτηση καλείται από το "Unlock" κουμπί του HTML σου
            runOnUiThread {
                launchBillingFlow(planId)
            }
        }
    }

    private fun setupBillingClient() {
        billingClient = BillingClient.newBuilder(this)
            .setListener { billingResult, purchases ->
                if (billingResult.responseCode == BillingClient.BillingResponseCode.OK && purchases != null) {
                    Toast.makeText(this, "Elite Access Activated!", Toast.LENGTH_LONG).show()
                    webView.loadUrl("javascript:paymentSuccess()") // Ενημερώνει το HTML
                }
            }
            .enablePendingPurchases()
            .build()

        billingClient.startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(billingResult: BillingResult) {
                // Connection Ready
            }
            override fun onBillingServiceDisconnected() {
                // Try reconnecting logic
            }
        })
    }

    private fun launchBillingFlow(skuId: String) {
        // Σημείωση: Το skuId (monthly, annual) πρέπει να υπάρχει στο Google Play Console
        Toast.makeText(this, "Connecting to Google Play for: $skuId", Toast.LENGTH_SHORT).show()
        // Εδώ προστίθεται η ροή αγοράς ανάλογα με τα Product IDs σου
    }

    // --- EMERGENCY FUNCTIONS ---
    private fun getCountryCode(): String {
        val tm = getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
        val code = tm.networkCountryIso.uppercase()
        return if (code.isNotEmpty()) code else "GR"
    }

    private fun loadJSONFromAsset(fileName: String): String? {
        return try {
            assets.open(fileName).bufferedReader().use { it.readText() }
        } catch (e: Exception) { null }
    }

    private fun parseEmergencyNumbers(jsonString: String, countryCode: String): Map<String, String>? {
        try {
            val jsonObject = JSONObject(jsonString)
            val regions = jsonObject.getJSONArray("regions")
            val isoToName = mapOf("GR" to "Greece", "US" to "USA & Canada", "CY" to "Cyprus")
            val targetCountry = isoToName[countryCode] ?: "Greece"

            for (i in 0 until regions.length()) {
                val countries = regions.getJSONObject(i).getJSONArray("countries")
                for (j in 0 until countries.length()) {
                    val country = countries.getJSONObject(j)
                    if (country.getString("name").equals(targetCountry, ignoreCase = true)) {
                        return mapOf("police" to country.getString("police"), "medical" to country.getString("medical"))
                    }
                }
            }
        } catch (e: Exception) { }
        return null
    }

    private fun updateUI(numbers: Map<String, String>?) {
        val policeBtn = findViewById<Button>(R.id.btn_police)
        val medicalBtn = findViewById<Button>(R.id.btn_medical)
        numbers?.let {
            policeBtn.text = "POLICE: ${it["police"]}"
            medicalBtn.text = "AMBULANCE: ${it["medical"]}"
            policeBtn.setOnClickListener { makePhoneCall(it["police"]!!) }
            medicalBtn.setOnClickListener { makePhoneCall(it["medical"]!!) }
        }
    }

    private fun makePhoneCall(number: String) {
        val intent = Intent(Intent.ACTION_DIAL)
        intent.data = Uri.parse("tel:$number")
        startActivity(intent)
    }
}

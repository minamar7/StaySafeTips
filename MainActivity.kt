/* * Repository: https://minamar7.github.io/StaySafeTips/
 * Stay Safe Elite - Android Application Logic
 */

package com.staysafe.elite

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.telephony.TelephonyManager
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import org.json.JSONObject

class MainActivity : AppCompatActivity() {

    // Repository Link constant for reference
    private val REPO_URL = "https://minamar7.github.io/StaySafeTips/"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. Detect Country Code from SIM/Network
        val countryCode = getCountryCode()

        // 2. Load Emergency Data from JSON file in Assets
        val jsonData = loadJSONFromAsset("emergency_data.json")
        
        // 3. Parse numbers based on the detected country
        if (jsonData != null) {
            val numbers = parseEmergencyNumbers(jsonData, countryCode)
            // 4. Update UI buttons with numbers and setup Click Listeners
            updateUI(numbers)
        } else {
            Toast.makeText(this, "Emergency data file not found!", Toast.LENGTH_LONG).show()
        }
    }

    /**
     * Get ISO Country Code from SIM or Network
     */
    private fun getCountryCode(): String {
        val tm = getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
        val code = tm.networkCountryIso.uppercase()
        return if (code.isNotEmpty()) code else "GR" // Default to Greece if not found
    }

    /**
     * Read JSON file from assets folder
     */
    private fun loadJSONFromAsset(fileName: String): String? {
        return try {
            assets.open(fileName).bufferedReader().use { it.readText() }
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    /**
     * Parse JSON to find emergency numbers for the target country
     */
    private fun parseEmergencyNumbers(jsonString: String, countryCode: String): Map<String, String>? {
        return try {
            val jsonObject = JSONObject(jsonString)
            val regions = jsonObject.getJSONArray("regions")
            
            // Map ISO codes to Names used in your emergency_data.json
            val isoToName = mapOf(
                "GR" to "Greece", 
                "US" to "USA & Canada", 
                "CY" to "Cyprus", 
                "DE" to "Germany",
                "FR" to "France",
                "IT" to "Italy"
            )
            val targetCountry = isoToName[countryCode] ?: "Greece"

            var result: Map<String, String>? = null

            for (i in 0 until regions.length()) {
                val countries = regions.getJSONObject(i).getJSONArray("countries")
                for (j in 0 until countries.length()) {
                    val country = countries.getJSONObject(j)
                    if (country.getString("name").equals(targetCountry, ignoreCase = true)) {
                        result = mapOf(
                            "police" to country.getString("police"),
                            "medical" to country.getString("medical"),
                            "fire" to country.getString("fire")
                        )
                        break
                    }
                }
            }
            result
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    /**
     * Link numbers to UI buttons and setup the Calling Intent
     */
    private fun updateUI(numbers: Map<String, String>?) {
        val policeBtn = findViewById<Button>(R.id.btn_police)
        val medicalBtn = findViewById<Button>(R.id.btn_medical)
        
        numbers?.let {
            val policeNumber = it["police"]
            val medicalNumber = it["medical"]

            policeBtn.text = "CALL POLICE: $policeNumber"
            medicalBtn.text = "CALL AMBULANCE: $medicalNumber"
            
            // Logic to open Dialer with the number
            policeBtn.setOnClickListener {
                makePhoneCall(policeNumber!!)
            }

            medicalBtn.setOnClickListener {
                makePhoneCall(medicalNumber!!)
            }
        }
    }

    /**
     * Open the Native Dialer with the specific number
     */
    private fun makePhoneCall(number: String) {
        val intent = Intent(Intent.ACTION_DIAL)
        intent.data = Uri.parse("tel:$number")
        startActivity(intent)
    }
}

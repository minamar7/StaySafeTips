package com.staysafe.elite // Άλλαξε το με το δικό σου package name

import android.content.Context
import android.os.Bundle
import android.telephony.TelephonyManager
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import org.json.JSONObject
import java.io.InputStream

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. Εντοπισμός Χώρας από τη SIM
        val countryCode = getCountryCode()

        // 2. Διάβασμα των δεδομένων από το JSON
        val emergencyData = loadJSONFromAsset("emergency_data.json")
        
        // 3. Εύρεση των τηλεφώνων για τη συγκεκριμένη χώρα
        val numbers = parseEmergencyNumbers(emergencyData, countryCode)

        // 4. Ενημέρωση του UI (Κουμπιά & Κείμενο)
        updateUI(numbers)
    }

    private fun getCountryCode(): String {
        val tm = getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
        val code = tm.networkCountryIso.uppercase()
        return if (code.isNotEmpty()) code else "GR" // Default στην Ελλάδα αν δεν βρει σήμα
    }

    private fun loadJSONFromAsset(fileName: String): String {
        return assets.open(fileName).bufferedReader().use { it.readText() }
    }

    private fun parseEmergencyNumbers(jsonString: String, countryCode: String): Map<String, String>? {
        val jsonObject = JSONObject(jsonString)
        val regions = jsonObject.getJSONArray("regions")
        
        // Χάρτης αντιστοίχισης ISO κωδικών με τα ονόματα στο JSON σου
        val isoToName = mapOf("GR" to "Greece", "US" to "USA & Canada", "CY" to "Cyprus", "DE" to "Germany")
        val targetCountry = isoToName[countryCode] ?: "Greece"

        for (i in 0 until regions.length()) {
            val countries = regions.getJSONObject(i).getJSONArray("countries")
            for (j in 0 until countries.length()) {
                val country = countries.getJSONObject(j)
                if (country.getString("name") == targetCountry) {
                    return mapOf(
                        "police" to country.getString("police"),
                        "medical" to country.getString("medical"),
                        "fire" to country.getString("fire")
                    )
                }
            }
        }
        return null
    }

    private fun updateUI(numbers: Map<String, String>?) {
        val policeBtn = findViewById<Button>(R.id.btn_police)
        val medicalBtn = findViewById<Button>(R.id.btn_medical)
        
        numbers?.let {
            policeBtn.text = "POLICE: ${it["police"]}"
            medicalBtn.text = "AMBULANCE: ${it["medical"]}"
            
            // Εδώ προσθέτεις το logic για να παίρνει τηλέφωνο όταν πατηθεί
            policeBtn.setOnClickListener { /* Intent για κλήση */ }
        }
    }
}

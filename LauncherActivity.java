package com.minamar7.staysafetipselite;

/**
 * Καθαρή TWA LauncherActivity. Ανοίγεται ΜΟΝΟ από τη SplashAdActivity,
 * αφού πρώτα δειχτεί το interstitial ad.
 *
 * ΔΕΝ πρέπει να περιέχει κώδικα διαφημίσεων ή δικό της UI/layout —
 * η βασική κλάση αναλαμβάνει όλη τη λογική για να ανοίξει το site σας
 * μέσα σε Trusted Web Activity, διαβάζοντας το meta-data
 * "android.support.customtabs.trusted.DEFAULT_URL" από το manifest.
 */
public class LauncherActivity extends com.google.androidbrowserhelper.trusted.LauncherActivity {
    // Δεν χρειάζεται να προσθέσετε τίποτα εδώ.
    // Αν αργότερα χρειαστεί custom συμπεριφορά (π.χ. splash screen της ίδιας
    // της TWA βιβλιοθήκης), μπορείτε να κάνετε override συγκεκριμένες μεθόδους,
    // αλλά ΠΟΤΕ μην προσθέσετε δικό σας setContentView() εδώ.
}

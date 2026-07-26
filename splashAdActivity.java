package com.minamar7.staysafetipselite;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

/**
 * Αυτή είναι η activity που ανοίγει πρώτη (MAIN/LAUNCHER).
 * Φορτώνει και δείχνει ένα interstitial ad, και μόλις αυτό κλείσει
 * (ή αποτύχει να φορτώσει), ανοίγει την πραγματική LauncherActivity
 * που είναι το καθαρό TWA (site σας).
 */
public class SplashAdActivity extends AppCompatActivity {

    private static final String INTERSTITIAL_ID = "ca-app-pub-4000056160039274/5757258163";

    private InterstitialAd mInterstitialAd;
    private boolean hasProceeded = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MobileAds.initialize(this, initializationStatus -> loadInterstitial());
    }

    private void loadInterstitial() {
        AdRequest adRequest = new AdRequest.Builder().build();

        InterstitialAd.load(this, INTERSTITIAL_ID, adRequest, new InterstitialAdLoadCallback() {
            @Override
            public void onAdLoaded(@NonNull InterstitialAd ad) {
                // FIX: αν η ασφάλεια των 4" έχει ήδη προχωρήσει στο LauncherActivity
                // (και η SplashAdActivity έχει κάνει finish()), μην προσπαθήσεις να
                // δείξεις τη διαφήμιση - θα έκανε crash πάνω σε "νεκρή" activity.
                if (hasProceeded) return;

                mInterstitialAd = ad;
                mInterstitialAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        proceedToApp();
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(@NonNull AdError adError) {
                        proceedToApp();
                    }
                });
                mInterstitialAd.show(SplashAdActivity.this);
            }

            @Override
            public void onAdFailedToLoad(@NonNull com.google.android.gms.ads.LoadAdError loadAdError) {
                // Αν δεν φορτώσει διαφήμιση (π.χ. χωρίς σύνδεση), προχωράμε κανονικά
                proceedToApp();
            }
        });

        // Ασφάλεια: αν για οποιοδήποτε λόγο η διαδικασία "κολλήσει"
        // (π.χ. αργό δίκτυο), προχωράμε ούτως ή άλλως μετά από 4 δευτερόλεπτα
        // ώστε ο χρήστης να μην μείνει ποτέ σε άδεια/κολλημένη οθόνη.
        new android.os.Handler(getMainLooper()).postDelayed(this::proceedToApp, 4000);
    }

    private void proceedToApp() {
        if (hasProceeded) return;
        hasProceeded = true;
        Intent intent = new Intent(this, LauncherActivity.class);
        startActivity(intent);
        finish();
    }
}

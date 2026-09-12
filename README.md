# Klemmbausteinbude als GitHub-Pages-PWA

1. Lege auf GitHub ein neues Repository an (zum Beispiel `klemmbausteinbude`).
2. Lade alle Dateien aus diesem Paket per **Add file → Upload files** oder Drag & Drop im Browser hoch und committe sie auf den Branch `main`.
3. Öffne **Settings → Pages**. Wähle unter *Build and deployment* den Branch `main` und den Ordner `/ (root)` und speichere.
4. Warte kurz auf den Build. Die Adresse hat dieses Format: `https://username.github.io/reponame/`.
5. Auf dem Handy installieren: Android Chrome → Menü → **App installieren**; iOS Safari → **Teilen → Zum Home-Bildschirm**.

Die eigenen Bauanleitungen liegen per `localStorage` pro Gerät und Browser. Nutze daher im Admin-Modus regelmäßig den Backup-Export, bevor du Browserdaten löschst oder das Gerät wechselst.

Nach Änderungen an HTML, Manifest oder Icons erhöhe in `sw.js` die Versionsnummer im Cache-Namen, zum Beispiel von `klemmbausteinbude-v1` auf `klemmbausteinbude-v2`. So wird der neue Stand sicher übernommen.

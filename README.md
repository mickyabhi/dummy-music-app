# neend-mobile-app

# Create KeyStore

# keytool -genkey -v -keystore neend_app.keystore -alias neend_app -keyalg RSA -keysize 2048 -validity 10000

# keytool -list -v -alias neend_app -keystore neend_app.keystore

# Certificate fingerprints:

# SHA1: C2:E8:EC:09:42:B7:7C:0D:EC:63:6C:C9:47:C0:54:4D:78:9A:E5:75

# SHA256: C8:6B:95:7E:4B:49:17:39:8D:49:F7:3A:2F:1B:75:62:BA:9F:86:25:F0:EF:F7:8B:D0:4A:52:6A:A2:E6:74:0E

# to create Android release build use below command

# cd android

# ./gradlew assembleRelease

# Facebook SDK development/release key export command. Run in Git Bash or machine with openssl

# keytool -exportcert -alias neend_app -keystore neend_app.keystore | openssl sha1 -binary | openssl base64

#!/bin/bash
# ========================================
# Script Setup SSH untuk Deployment
# Cara Penggunaan:
# chmod +x setup-auto.sh
# ./setup-auto.sh
# ========================================

# Menghentikan script jika terjadi error
set -e

# 1. Deteksi USERNAME otomatis
USER=$(whoami)

# 2. Deteksi IP Publik otomatis (gunakan layanan eksternal)
SERVER_IP=$(curl -s ifconfig.me)

# 3. Pastikan email ada sebagai inputan
if [ -z "$EMAIL" ]; then
    read -p "Masukkan email untuk SSH key: " EMAIL
fi

# 4. Cek apakah kunci SSH sudah ada
if [ ! -f "$HOME/.ssh/id_ed25519" ]; then
    echo "Membuat kunci SSH baru..."

    # Membuat kunci SSH baru tanpa passphrase
    ssh-keygen -t ed25519 -C "$EMAIL" -f "$HOME/.ssh/id_ed25519" -q -N ""
    echo "Kunci SSH berhasil dibuat di $HOME/.ssh/id_ed25519"
else
    echo "Kunci SSH sudah ada di $HOME/.ssh/id_ed25519"
fi

# 5. Pastikan direktori .ssh ada di server remote dan atur izin
echo "Menyiapkan direktori .ssh di server remote..."
ssh -o StrictHostKeyChecking=no "$USER@$SERVER_IP" <<'EOF'
  mkdir -p ~/.ssh
  chmod 700 ~/.ssh
EOF

# 6. Menambahkan kunci publik ke authorized_keys di server remote
echo "Menambahkan kunci publik ke server remote..."
ssh-copy-id -i "$HOME/.ssh/id_ed25519.pub" "$USER@$SERVER_IP" || {
    echo "Gagal menyalin kunci. Periksa apakah SSH dapat diakses atau kunci sudah ada."
    exit 1
}

# 7. Verifikasi koneksi SSH tanpa password
echo "Verifikasi koneksi SSH tanpa password..."
if ssh -o BatchMode=yes "$USER@$SERVER_IP" "echo 'Koneksi SSH berhasil tanpa password.'"; then
    echo "Koneksi SSH berhasil tanpa password."
else
    echo "Verifikasi koneksi SSH gagal. Periksa kembali konfigurasi."
    exit 1
fi

# 8. Menampilkan kunci privat untuk disalin ke GitHub Secrets
echo "===== Salin kunci berikut ke GitHub Secrets (SSH_PRIVATE_KEY) ====="
cat "$HOME/.ssh/id_ed25519"
echo "==================================================================="

# 9. Menampilkan IP server untuk GitHub Secrets (DROPLET_IP)
echo "===== Salin IP berikut ke GitHub Secrets (DROPLET_IP) ====="
echo "$SERVER_IP"
echo "=========================================================="

# 10. Menampilkan username server untuk GitHub Secrets (SERVER_USERNAME)
echo "===== Salin username berikut ke GitHub Secrets (SERVER_USERNAME) ====="
echo "$USER"
echo "====================================================================="

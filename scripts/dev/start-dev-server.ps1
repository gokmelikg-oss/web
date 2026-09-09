# -----------------------------------------------------------------------------
# Şimşek Solar KURUMSAL SİTE — dev sunucusunu KOPUK (detached) başlatır.
# Port 3005.
#
# ⚠ NEDEN WMI?
# Dev sunucusu her oturumda ölüyordu: asistanın kabuğundan başlatılan süreç,
# kabuk oturumu kapanınca CTRL_C_EXIT (0xC000013A) alıp düşüyor. Windows'ta
# süreç, çağıran kabuğun konsol/İş Nesnesi grubunda kalır.
#
# Denenmiş ve YETMEYEN yöntemler (CRM projesinde 03.09.2026'da tespit edildi):
#   1. `npm run dev` doğrudan kabuktan          → kabuk kapanınca ölür
#   2. Görev Zamanlayıcı + `cmd /c npm run dev` → yine Ctrl+C ile ölür
#   3. Görev Zamanlayıcı + `node.exe` doğrudan  → yine Ctrl+C ile ölür
#
# ÇALIŞAN yöntem: süreci WMI (`Win32_Process.Create`) ile oluşturmak.
# Sürecin ebeveyni `WmiPrvSE.exe` (sistem servisi) olur; hiçbir konsola bağlı
# olmadığı için Ctrl+C ulaşmaz.
#
# ⚠ PORT SABİTTİR. Port belirtilmezse Next.js her açılışta boş bir porta
# düşer (3000/3001/3002…) ve verilen localhost adresi bir sonraki oturumda
# yanlış olur. CRM projesi 3210'da, bu site 3005'te.
#
# Kullanım:
#   powershell -File scripts\dev\start-dev-server.ps1
# (zaten çalışıyorsa hiçbir şey yapmaz — güvenle tekrar çalıştırılabilir)
# -----------------------------------------------------------------------------

# ⚠ YOL SABİT YAZILMAZ.
# Windows PowerShell 5.1, BOM'suz bir .ps1 dosyasını ANSI (Windows-1254)
# okur. Dosya UTF-8 kaydedildiği için "Masaüstü" içindeki "ü" bozuluyor
# ("MasaÃ¼stÃ¼"), klasör bulunamıyor ve Win32_Process.Create 8 numaralı
# "bilinmeyen hata"yı döndürüyordu.
# Bu yüzden masaüstü yolu işletim sisteminden ALINIR ve betik ASCII kalır.
$repo = Join-Path ([Environment]::GetFolderPath('Desktop')) 'web'
$port = 3005

if (-not (Test-Path (Join-Path $repo 'package.json'))) {
    Write-Output "Proje bulunamadi: $repo"
    exit 1
}

$listening = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($listening) {
    Write-Output "Dev sunucusu zaten calisiyor -> http://localhost:$port/tr"
    exit 0
}

$cmd = "`"C:\Program Files\nodejs\node.exe`" `"$repo\node_modules\next\dist\bin\next`" dev -p $port"
$result = Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{
    CommandLine      = $cmd
    CurrentDirectory = $repo
}

if ($result.ReturnValue -eq 0) {
    Write-Output "Dev sunucusu baslatildi (PID $($result.ProcessId)) -> http://localhost:$port/tr"
} else {
    Write-Output "BASLATILAMADI - WMI hata kodu: $($result.ReturnValue)"
    exit 1
}

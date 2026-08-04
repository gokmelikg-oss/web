/* Bal küpü (honeypot) spam tuzağı. Ekran dışına konumlanır; gerçek kullanıcı
   görmez/doldurmaz, botlar doldurur. Doluysa API gönderimi sessizce yutar.
   Kapsayıcı form/kart "relative" olmalıdır (mevcut form kartları öyle). */
export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
      <label>
        Web siteniz
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

import { BG } from '@/lib/i18n';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-8">{BG.terms.title}</h1>
      <div className="card p-8 space-y-4 text-gray-700">
        <p>Добре дошли в Primavera-5 (primavera-5.com). С използването на нашия уебсайт, вие се съгласявате със следните условия.</p>
        <h2 className="text-xl font-semibold text-primary">1. Общи положения</h2>
        <p>Primavera-5 е онлайн магазин за авточасти, аксесоари и оборудване за автомобили. Всички цени са в евро (€).</p>
        <h2 className="text-xl font-semibold text-primary">2. Регистрация</h2>
        <p>За да видите цените и да правите поръчки, е необходима регистрация. Вие носите отговорност за поверителността на вашата парола.</p>
        <h2 className="text-xl font-semibold text-primary">3. Поръчки и плащане</h2>
        <p>Поръчките се обработват след потвърждение. Цените на дребно и на едро са посочени в евро. Запазваме си правото да променяме цените без предварително уведомление.</p>
        <h2 className="text-xl font-semibold text-primary">4. Доставка</h2>
        <p>Доставката се извършва в рамките на България. Сроковете за доставка зависят от наличността на продуктите.</p>
        <h2 className="text-xl font-semibold text-primary">5. Връщане и рекламации</h2>
        <p>Имате право да върнете продукт в срок от 14 дни, ако не отговаря на описанието. Рекламации се приемат в съответствие със законодателството на Република България.</p>
        <h2 className="text-xl font-semibold text-primary">6. Отговорност</h2>
        <p>Primavera-5 не носи отговорност за неправилна употреба на продуктите. Гаранцията е в съответствие с производителя.</p>
        <h2 className="text-xl font-semibold text-primary">7. Контакт</h2>
        <p>info@primavera-5.com | +359 888 000 000 | София, България</p>
      </div>
    </div>
  );
}

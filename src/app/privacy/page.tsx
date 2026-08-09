import { BG } from '@/lib/i18n';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-8">{BG.privacy.title}</h1>
      <div className="card p-8 prose prose-sm max-w-none space-y-4 text-gray-700">
        <p>Настоящата политика за поверителност описва как Primavera-5 (primavera-5.com) събира, използва и защитава вашата лична информация.</p>
        <h2 className="text-xl font-semibold text-primary">1. Събиране на информация</h2>
        <p>Събираме информация, която предоставяте при регистрация: име, имейл адрес, телефонен номер. Също така събираме данни за посещенията на сайта за статистически цели.</p>
        <h2 className="text-xl font-semibold text-primary">2. Използване на информацията</h2>
        <p>Вашите данни се използват за обработка на поръчки, комуникация с вас и подобряване на нашите услуги. Не споделяме личната ви информация с трети страни без ваше съгласие.</p>
        <h2 className="text-xl font-semibold text-primary">3. Защита на данните</h2>
        <p>Прилагаме подходящи технически и организационни мерки за защита на вашите лични данни срещу неоторизиран достъп, промяна или унищожаване.</p>
        <h2 className="text-xl font-semibold text-primary">4. Бисквитки</h2>
        <p>Използваме бисквитки за подобряване на потребителското изживяване и проследяване на посещенията. Можете да деактивирате бисквитките в настройките на браузъра си.</p>
        <h2 className="text-xl font-semibold text-primary">5. Вашите права</h2>
        <p>Имате право на достъп, коригиране и изтриване на вашите лични данни. За упражняване на тези права, свържете се с нас на info@primavera-5.com.</p>
        <h2 className="text-xl font-semibold text-primary">6. Контакт</h2>
        <p>За въпроси относно поверителността: info@primavera-5.com | +359 888 000 000</p>
      </div>
    </div>
  );
}

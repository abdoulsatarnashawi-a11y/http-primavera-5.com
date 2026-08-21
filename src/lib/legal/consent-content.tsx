import Link from 'next/link';
import { LEGAL_INFO } from '@/lib/legal';

export const consentSections = [
  {
    id: 'vavedenie',
    title: 'Въведение',
    content: (
      <>
        <p>
          Настоящата Политика за бисквитки и съгласие („Политиката“) обяснява как{' '}
          <strong>{LEGAL_INFO.companyName}</strong> използва бисквитки и подобни технологии на
          уебсайта{' '}
          <a href={LEGAL_INFO.websiteUrl} className="text-primary hover:underline">{LEGAL_INFO.website}</a>,
          в съответствие с:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Регламент (ЕС) 2016/679 (GDPR);</li>
          <li>Директива 2002/58/ЕО (ePrivacy), както е транспонирана в националното законодателство;</li>
          <li>Закон за електронните съобщения на Република България;</li>
          <li>Насоките на Европейския съвет за защита на данните (EDPB) и националните надзорни органи.</li>
        </ul>
        <p>
          Политиката се прилага към всички посетители от държавите членки на Европейския съюз и
          Европейското икономическо пространство (ЕИП), както и към всички лица, за които се
          прилага GDPR.
        </p>
      </>
    ),
  },
  {
    id: 'kakvo-sa-biskvitki',
    title: 'Какво са бисквитките?',
    content: (
      <>
        <p>
          Бисквитките (cookies) са малки текстови файлове, които се съхраняват на Вашето устройство
          (компютър, таблет, смартфон) при посещение на уебсайт. Те позволяват на сайта да
          запомни действията и предпочитанията Ви за определен период.
        </p>
        <p>
          Освен бисквитки, можем да използваме и подобни технологии като localStorage и sessionStorage
          за съхраняване на технически идентификатори и предпочитания за съгласие.
        </p>
      </>
    ),
  },
  {
    id: 'kategorii',
    title: 'Категории бисквитки',
    content: (
      <>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 font-semibold text-primary">Категория</th>
                <th className="text-left py-2 pr-4 font-semibold text-primary">Цел</th>
                <th className="text-left py-2 font-semibold text-primary">Съгласие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 pr-4 align-top"><strong>Строго необходими</strong></td>
                <td className="py-3 pr-4 align-top">
                  Осигуряване на основната функционалност: сесия за вход, количка, сигурност.
                  Без тях сайтът не може да функционира правилно.
                </td>
                <td className="py-3 align-top">Не се изисква (чл. 5, ал. 3 от ePrivacy)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top"><strong>Функционални</strong></td>
                <td className="py-3 pr-4 align-top">
                  Запомняне на предпочитания (език, настройки). В момента не се използват активно.
                </td>
                <td className="py-3 align-top">Изисква се съгласие</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top"><strong>Аналитични</strong></td>
                <td className="py-3 pr-4 align-top">
                  Статистика за посещаемост (брой посетители, онлайн потребители) за подобряване
                  на услугата. Данните са агрегирани.
                </td>
                <td className="py-3 align-top">Изисква се изрично съгласие</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top"><strong>Маркетингови</strong></td>
                <td className="py-3 pr-4 align-top">
                  Проследяване за персонализирана реклама. В момента <strong>не се използват</strong>.
                </td>
                <td className="py-3 align-top">Изисква се изрично съгласие</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'spisak-biskvitki',
    title: 'Списък на използваните бисквитки и технологии',
    content: (
      <>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-3 font-semibold text-primary">Име</th>
                <th className="text-left py-2 pr-3 font-semibold text-primary">Тип</th>
                <th className="text-left py-2 pr-3 font-semibold text-primary">Цел</th>
                <th className="text-left py-2 font-semibold text-primary">Срок</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2 pr-3 align-top"><code className="text-xs bg-slate-100 px-1 rounded">session</code></td>
                <td className="py-2 pr-3 align-top">Необходима (HTTP cookie)</td>
                <td className="py-2 pr-3 align-top">Удостоверяване на потребителска сесия след вход</td>
                <td className="py-2 align-top">7 дни</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 align-top"><code className="text-xs bg-slate-100 px-1 rounded">primavera_cookie_consent</code></td>
                <td className="py-2 pr-3 align-top">Необходима (localStorage)</td>
                <td className="py-2 pr-3 align-top">Съхраняване на предпочитанията Ви за бисквитки</td>
                <td className="py-2 align-top">12 месеца</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 align-top"><code className="text-xs bg-slate-100 px-1 rounded">visitor_session</code></td>
                <td className="py-2 pr-3 align-top">Аналитична (localStorage)</td>
                <td className="py-2 pr-3 align-top">Анонимен идентификатор за статистика на посещенията</td>
                <td className="py-2 align-top">До оттегляне на съгласието</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'upravlenie-saglasie',
    title: 'Управление на съгласието',
    content: (
      <>
        <p>
          При първо посещение на сайта се показва банер за бисквитки, чрез който можете да:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Приемете всички</strong> — включва аналитичните бисквитки;</li>
          <li><strong>Отхвърлите несъществените</strong> — само строго необходимите бисквитки;</li>
          <li><strong>Персонализирате</strong> — изберете отделно кои категории да разрешите.</li>
        </ul>
        <p>
          Можете да промените или оттеглите съгласието си по всяко време чрез бутона „Настройки за
          бисквитки“ в долната част на страницата или като изчистите localStorage в браузъра си.
        </p>
        <p>
          Оттеглянето на съгласие не засяга законосъобразността на обработването, извършено преди
          оттеглянето (чл. 7, ал. 3 от GDPR).
        </p>
      </>
    ),
  },
  {
    id: 'pravno-osnovanie-cookies',
    title: 'Правно основание',
    content: (
      <>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Строго необходими бисквитки:</strong> изключение по
            чл. 5, ал. 3 от ePrivacy — необходими за предоставяне на услугата, поискана от
            потребителя.
          </li>
          <li>
            <strong>Аналитични бисквитки:</strong> <strong>съгласие</strong> по чл. 6, ал. 1, б. „а“
            от GDPR и чл. 5, ал. 3 от ePrivacy.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'treti-strani',
    title: 'Бисквитки на трети страни',
    content: (
      <>
        <p>
          В момента не използваме бисквитки на трети страни за реклама или социални мрежи. Ако в
          бъдеще бъдат въведени такива, ще актуализираме настоящата Политика и ще поискаме
          съответното съгласие преди тяхното поставяне.
        </p>
      </>
    ),
  },
  {
    id: 'brauzarni-nastroiki',
    title: 'Настройки на браузъра',
    content: (
      <>
        <p>
          Можете да управлявате или изтривате бисквитки чрез настройките на Вашия браузър. Имайте
          предвид, че деактивирането на строго необходимите бисквитки може да попречи на
          функционирането на сайта (напр. вход в акаунт, количка).
        </p>
        <p>Инструкции за популярни браузъри:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/bg/kb/biskvitki" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/bg-bg/guide/safari/sfri11471/mac" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
          <li><a href="https://support.microsoft.com/bg-bg/microsoft-edge/iztrivane-na-biskvitki-v-microsoft-edge" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        </ul>
      </>
    ),
  },
  {
    id: 'vrska-privacy',
    title: 'Връзка с Политиката за поверителност',
    content: (
      <>
        <p>
          За информация относно обработването на лични данни, Вашите права и контакт с
          администратора, вижте{' '}
          <Link href="/privacy" className="text-primary hover:underline">Политиката за поверителност</Link>.
          За общите условия на ползване вижте{' '}
          <Link href="/terms" className="text-primary hover:underline">Общите условия</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'kontakt-consent',
    title: 'Контакт',
    content: (
      <>
        <p>За въпроси относно бисквитките и съгласието:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Имейл: <a href={`mailto:${LEGAL_INFO.email}`} className="text-primary hover:underline">{LEGAL_INFO.email}</a></li>
          <li>Телефон: {LEGAL_INFO.phone}</li>
        </ul>
      </>
    ),
  },
];

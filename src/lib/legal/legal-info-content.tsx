import Link from 'next/link';
import { EU_LINKS, LEGAL_INFO } from '@/lib/legal';

export const legalInfoSections = [
  {
    id: 'vavedenie',
    title: 'Въведение',
    content: (
      <>
        <p>
          Настоящата страница съдържа задължителната законна информация за търговеца по смисъла на
          Закона за електронната търговия (ЗЕТ), Закона за защита на потребителите (ЗЗП) и
          Регламент (ЕС) 2016/679 (GDPR), както е изисквано за онлайн търговци, регистрирани в
          Република България.
        </p>
        <p>
          Информацията е предоставена на български език, на ясен и разбираем начин, за да можете да
          вземете информирано решение преди сключване на договор.
        </p>
      </>
    ),
  },
  {
    id: 'danni-na-trgoveca',
    title: 'Данни за търговеца',
    content: (
      <>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Наименование:</strong> {LEGAL_INFO.companyName}</li>
          <li><strong>Правна форма:</strong> {LEGAL_INFO.legalForm}</li>
          <li><strong>ЕИК/БУЛСТАТ:</strong> {LEGAL_INFO.eik}</li>
          <li><strong>ДДС номер:</strong> {LEGAL_INFO.vatNumber}</li>
          <li><strong>Регистрация по ЗДДС:</strong> {LEGAL_INFO.vatRegistered}</li>
          <li><strong>Седалище и адрес на управление:</strong> {LEGAL_INFO.address}</li>
          <li><strong>Уебсайт:</strong> <a href={LEGAL_INFO.websiteUrl} className="text-primary hover:underline">{LEGAL_INFO.websiteUrl}</a></li>
          <li><strong>Имейл:</strong> <a href={`mailto:${LEGAL_INFO.email}`} className="text-primary hover:underline">{LEGAL_INFO.email}</a></li>
          <li><strong>Телефон:</strong> {LEGAL_INFO.phone}</li>
          <li><strong>Лице за контакт:</strong> {LEGAL_INFO.contactPerson}</li>
        </ul>
      </>
    ),
  },
  {
    id: 'registri',
    title: 'Регистрационни данни',
    content: (
      <>
        <p>
          Търговецът е регистриран в Търговския регистър и регистъра на юридическите лица с
          неналожителен характер към Агенцията по вписванията с ЕИК {LEGAL_INFO.eik}.
        </p>
        <p>
          При наличие на лиценз или разрешител за специфична дейност, съответната информация ще
          бъде публикувана на тази страница.
        </p>
      </>
    ),
  },
  {
    id: 'pravila-i-usloviya',
    title: 'Общи условия и политики',
    content: (
      <>
        <p>За пълните правила, уреждащи ползването на сайта и покупките, вижте:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <Link href="/terms" className="text-primary hover:underline">Общи условия</Link> — договорни
            отношения, поръчки, плащане, доставка, гаранция;
          </li>
          <li>
            <Link href="/privacy" className="text-primary hover:underline">Политика за поверителност</Link> — обработване
            на лични данни по GDPR;
          </li>
          <li>
            <Link href="/consent" className="text-primary hover:underline">Политика за бисквитки и съгласие</Link> — бисквитки
            и управление на съгласието;
          </li>
          <li>
            <Link href="/withdrawal" className="text-primary hover:underline">Формуляр за отказ от договор</Link> — упражняване
            на 14-дневното право на отказ.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'ceni-i-plashtane',
    title: 'Цени, такси и плащане',
    content: (
      <>
        <p>
          Всички цени на продуктите са посочени в евро (€) и включват ДДС, освен ако изрично не е
          посочено друго. Разходите за доставка се показват преди финализиране на поръчката.
        </p>
        <p>
          Приемат се посочените на сайта методи на плащане. Няма скрити такси, различни от
          обявените цени на продуктите и доставката.
        </p>
      </>
    ),
  },
  {
    id: 'dostavka',
    title: 'Доставка',
    content: (
      <>
        <p>
          Доставката се извършва на територията на Република България и, където е обявено, в други
          държави членки на ЕС/ЕИП. Сроковете и разходите за доставка се посочват преди
          потвърждаване на поръчката.
        </p>
      </>
    ),
  },
  {
    id: 'pravo-na-otkaz',
    title: 'Право на отказ',
    content: (
      <>
        <p>
          Потребителите имат право на отказ от договора в срок от 14 календарни дни без да посочват
          причина, съгласно чл. 50–56 от ЗЗП и Директива 2011/83/ЕС.
        </p>
        <p>
          За упражняване на правото използвайте{' '}
          <Link href="/withdrawal" className="text-primary hover:underline">формуляра за отказ</Link>{' '}
          или се свържете с нас на {LEGAL_INFO.email}.
        </p>
      </>
    ),
  },
  {
    id: 'sporove',
    title: 'Решаване на спорове',
    content: (
      <>
        <p>При възникване на спор можете да се обърнете към:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Комисия за защита на потребителите (КЗП):</strong>{' '}
            <a href="https://www.kzp.bg" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.kzp.bg</a>
            {' '}| тел. 0700 111 22
          </li>
          <li>
            <strong>Платформа за онлайн решаване на спорове (ОС) на ЕС:</strong>{' '}
            <a href={EU_LINKS.odr} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{EU_LINKS.odr}</a>
          </li>
        </ul>
        <p>
          Не сме задължени и не участваме в процедури за алтернативно решаване на спорове пред
          потребителски арбитражни комисии, освен ако това не е изрично предвидено.
        </p>
      </>
    ),
  },
  {
    id: 'pravna-ramka',
    title: 'Приложимо законодателство',
    content: (
      <>
        <p>Дейността на търговеца се урежда от следните основни актове:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Закон за защита на потребителите (ЗЗП);</li>
          <li>Закон за електронната търговия (ЗЕТ);</li>
          <li>Закон за електронните съобщения;</li>
          <li>Закон за задълженията и договорите (ЗЗД);</li>
          <li>Регламент (ЕС) 2016/679 (GDPR);</li>
          <li>Директива 2011/83/ЕС относно правата на потребителите;</li>
          <li>Директива (ЕС) 2019/771 относно определени аспекти на договорите за продажба на стоки.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'kontakt',
    title: 'Контакт',
    content: (
      <>
        <p>За въпроси относно законната информация:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Имейл: <a href={`mailto:${LEGAL_INFO.email}`} className="text-primary hover:underline">{LEGAL_INFO.email}</a></li>
          <li>Телефон: {LEGAL_INFO.phone}</li>
          <li>Адрес: {LEGAL_INFO.address}</li>
        </ul>
      </>
    ),
  },
];

import Layout from '~/components/Layout';
import useI18n from '~/i18n';
import Markdown from '../markdown/start.md';

const StartPage = async () => {
  const { addLocalePrefix, t } = useI18n();
  return (
    <Layout>
      <h1 class="mb-2 text-2xl font-bold">{t('start.welcome')}</h1>
      <Markdown />
      <p class="mb-2">
        {t('start.tryFormDemo', {
          formPageLink: chunk => (
            <a href={addLocalePrefix('/form')} class="text-blue-600 hover:underline">
              {chunk}
            </a>
          )
        })}
      </p>
    </Layout>
  );
};

export default StartPage;

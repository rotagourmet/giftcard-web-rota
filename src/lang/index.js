import { addLocaleData } from 'react-intl';
import ptLang from './entries/pt-BR';


const AppLocale = {
    pt: ptLang
    // es: esLang,
    // enrtl:enRtlLang
};
addLocaleData(AppLocale.pt.data);
// addLocaleData(AppLocale.es.data);
// addLocaleData(AppLocale.enrtl.data);

export default AppLocale;

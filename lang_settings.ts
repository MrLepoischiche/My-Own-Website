class LanguageSettings {
  private static selected_lang : number = 0;

  static readonly languages: string[] = [
    "English",
    "French"
    ];

    static get lang(): string {
      if(this.selected_lang > this.languages.length)
        return this.languages[0];
      return this.languages[this.selected_lang];
    }

    static set select_lang(value : number) {
      LanguageSettings.selected_lang = value;
    }
    
    static get_property_value(key : string, lang? : number | string) : string {
      let query : string = './';
      
      switch (typeof lang) {
        case 'number':
          query += LanguageSettings.languages[lang];
          break;
        
        case "string":
          query += lang;
          break;
        
        default:
          query += LanguageSettings.lang.toLowerCase();
          break;
      }

      query += '.json';

      let data = fetch(query, {
        headers: {
          'Accept': 'application/json'
        }
      }).then((res) => {return res.json()});

      return data[key];
    }
}
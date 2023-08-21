class LanguageSettings {
  private static selected_lang : number = 0;

  static readonly languages: string[] = [
    "English",
    "French"
  ];

  private static lang_selector : HTMLElement = document.getElementById("lang_selector")!;


  constructor() {
    document.addEventListener("load", () => {
      LanguageSettings.fetch_property_value(document.URL.split("/").pop() + ".title")
      .then(data => document.title = data)
    });

    LanguageSettings.lang_selector.addEventListener("load", () => {
      for (let lang in LanguageSettings.languages) {
        let option = document.createElement("option");
        option.setAttribute("value", lang.toLowerCase());
        //option.setAttribute("style", "");
        option.innerText = lang.slice(0, 2).toUpperCase();
        LanguageSettings.lang_selector.appendChild(option);
      }
    });
  }


  static get lang(): string {
    if(this.selected_lang > this.languages.length)
      return this.languages[0];
    return this.languages[this.selected_lang];
  }

  static set select_lang(value : number) {
    if(value !== LanguageSettings.selected_lang) {
      LanguageSettings.selected_lang = value;
      location.reload();
    }
  }
  
  static async fetch_property_value(key : string, lang? : number | string) {
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
    
    const response = await fetch(query, {
      headers: {
        'content-type': 'application/json'
      }
    })

    const {data, errors} = await response.json();
    if(response.ok){
      return data?.key;
    }
  }
}
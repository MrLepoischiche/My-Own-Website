class Settings {
  private selected_lang : number = 0;

  readonly #languages: string[] = [
    "English",
    "French"
    ];

    get lang(): string {
      if(this.selected_lang > this.#languages.length)
        return this.#languages[0];
      return this.#languages[this.selected_lang];
    }
    
    /*
    async get_property_value(key: string) : Promise<string> {
      const res = await fetch('./' + this.lang.toLowerCase() + '.json', {
        headers: {
          'Accept': 'application/json'
        }
      });
      const json_obj = await res.json();

      return json_obj[key];
    }
    */
}
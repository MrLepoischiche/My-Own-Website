var lang_selector = document.getElementById("lang_selector");

if(!sessionStorage.selected_lang){
  sessionStorage.setItem("selected_lang", String(0));

  let curr_lang = get_lang_by_id(sessionStorage.getItem("selected_lang"));

  if(curr_lang !== undefined) {
    sessionStorage.setItem("curr_lang_name", curr_lang.name);
    sessionStorage.setItem("curr_lang_str", JSON.stringify(curr_lang.content));
  }
}



for(const lang of get_all_langs()) {
  let option = document.createElement("option");
  option.setAttribute("value", lang.id);
  option.innerText = lang.name;
  if(i === Number(sessionStorage.getItem("selected_lang"))) option.selected = true;
  lang_selector.appendChild(option);
}


function set_lang() {
  if(lang_selector.value !== Number(sessionStorage.getItem("selected_lang"))) {
    sessionStorage.setItem("selected_lang", String(lang_selector.value));
    
    const new_lang = get_lang_by_id(sessionStorage.getItem("selected_lang"));

    if(new_lang !== undefined) {
      sessionStorage.setItem("curr_lang_name", new_lang.name);
      sessionStorage.setItem("curr_lang_str", JSON.stringify(new_lang.content));
    }

    location.reload();
  }
}

lang_selector.addEventListener("change", set_lang);
document.getElementById("lang_label").innerHTML = JSON.parse(sessionStorage.getItem("curr_lang_str"))["header.lang_label"] + " :";
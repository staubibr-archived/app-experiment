'use strict';

import Core from '../../api-web-devs/tools/core.js';
import Dom from '../../api-web-devs/tools/dom.js';
import Templated from '../../api-web-devs/components/templated.js';
import List from '../../api-web-devs/ui/list.js';

export default Core.Templatable("Widget.PageSelector", class PageSelector extends Templated { 

	constructor(node) {
		super(node);
		
		this.pages = {};
		this.current = null;
	}
	
	Add(id, label, content) {
		var options = { innerHTML:label, title:this.nls.Ressource("page_title", [label]) };
		var button = Dom.Create("button", options, this.Elem("pages"));
		
		this.pages[id] = { id:id, button:button, content:content }; 
		
		button.addEventListener("click", this.OnBtn_Click.bind(this, this.pages[id]));
	}
	
	Show(page_id) {
		if (this.current) {
			Dom.RemoveCss(this.current.button, "checked");
			Dom.AddCss(this.current.content.container, "hidden");
		}
		
		this.current = this.pages[page_id];
		
		Dom.AddCss(this.current.button, "checked");
		Dom.RemoveCss(this.current.content.container, "hidden");
	}
	
	OnBtn_Click(page, ev) {
		this.Show(page.id);
		
		this.Emit("change", { page:page.content });
	}
	
	
	
	Template() {
		return `<div handle='pages' class='page-selector row'></div>`;
	}
	
	static Nls() {
		return {
			"page_title": {
				"en": "Show {0} page"
			},
			"contributors": {
				"en": "Contributors"
			},
			"model_types": {
				"en": "Model types"
			},
			"experiments": {
				"en": "Experiments"
			}
		}
	}

});
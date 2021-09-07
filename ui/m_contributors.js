'use strict';

import Core from '../../api-web-devs/tools/core.js';
import Dom from '../../api-web-devs/tools/dom.js';
import Form from '../../api-web-devs/lom/forms/f_contributor.js';
import LoM from '../../api-web-devs/lom/lom.js';
import Manager from './manager.js';

export default Core.Templatable("Widget.ContributorsManager", class ContributorsManager extends Manager { 

	constructor(node) {
		super(node);
		
		this.form = new Form(this.Elem("form-container"));
		this.api = LoM.apis.contributors;
		
		LoM.On("change:contributors", this.OnLoM_Contributors_Change.bind(this));
	}
	
	UpdateLoM(entities) {
		LoM.contributors = entities;
	}
	
	OnLoM_Contributors_Change(ev) {
		this.entities = ev.value;
	}
	
	Template() {
		return super.Template()
	}
});
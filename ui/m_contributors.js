'use strict';

import Core from '../../app-framework/tools/core.js';
import Dom from '../../app-framework/tools/dom.js';
import Form from '../../app-framework/lom/forms/f_contributor.js';
import LoM from '../../app-framework/lom/lom.js';
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
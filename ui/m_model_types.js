'use strict';

import Core from '../../api-web-devs/tools/core.js';
import Dom from '../../api-web-devs/tools/dom.js';
import Form from '../../api-web-devs/lom/forms/f_model_type.js';
import LoM from '../../api-web-devs/lom/lom.js';
import Manager from './manager.js';

export default Core.Templatable("Widget.ModelTypesManager", class ModelTypesManager extends Manager { 

	constructor(node) {
		super(node);
		
		this.form = new Form(this.Elem("form-container"));
		this.api = LoM.apis.model_types;
		
		LoM.On("change:model_types", this.OnLoM_ModelTypes_Change.bind(this));
		LoM.On("change:contributors", this.OnLoM_Contributors_Change.bind(this));
	}
	
	UpdateLoM(entities) {
		LoM.model_types = entities;
	}
	
	OnLoM_Contributors_Change(ev) {
		this.form.authors = ev.value;
	}
	
	OnLoM_ModelTypes_Change(ev) {
		this.entities = ev.value;
	}
	
	Template() {
		return super.Template()
	}
});
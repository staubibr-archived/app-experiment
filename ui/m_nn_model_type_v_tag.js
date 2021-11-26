'use strict';

import Core from '../../app-framework/tools/core.js';
import Dom from '../../app-framework/tools/dom.js';
import Form from '../../app-framework/lom/forms/f_model_type.js';
import LoM from '../../app-framework/lom/lom.js';
import Manager from './manager.js';

export default Core.Templatable("Widget.NNModelTypesVTagsManager", class NNModelTypesVTagsManager extends Manager { 

	constructor(node) {
		super(node);
		
		this.form = new Form(this.Elem("form-container"));
		this.api = LoM.apis.nn_model_types_v_tags;
		
		LoM.On("change:nn_model_types_v_tags", this.OnLoM_NNModelTypesVTags_Change.bind(this));

	}
	
	OnLoM_NNModelTypesVTags_Change(ev) {
		this.entities = ev.value;
	}
	
	UpdateLoM(entities) {
		LoM.model_types = entities;
	}
	
	Template() {
		return "TODO"
	}
});
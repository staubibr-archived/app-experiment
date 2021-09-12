'use strict';

import Core from '../../api-web-devs/tools/core.js';
import Dom from '../../api-web-devs/tools/dom.js';
import Net from '../../api-web-devs/tools/net.js';
import Form from '../../api-web-devs/lom/forms/f_experiment.js';
import LoM from '../../api-web-devs/lom/lom.js';
import Manager from './manager.js';

export default Core.Templatable("Widget.ExperimentsManager", class ExperimentsManager extends Manager { 

	constructor(node) {
		super(node);
		
		this.form = new Form(this.Elem("form-container"));
		this.api = LoM.apis.experiments;
		
		LoM.On("change:experiments", this.OnLoM_Experiments_Change.bind(this));
		LoM.On("change:contributors", this.OnLoM_Contributors_Change.bind(this));
		LoM.On("change:model_types", this.OnLoM_ModelTypes_Change.bind(this));
		
		this.form.files.On("download", this.OnFiles_Download.bind(this));
	}
	
	UpdateLoM(entities) {
		LoM.experiments = entities;
	}
	
	OnLoM_Experiments_Change(ev) {
		this.entities = ev.value;
	}
	
	OnLoM_Contributors_Change(ev) {
		this.form.authors = ev.value;
	}
	
	OnLoM_ModelTypes_Change(ev) {
		var top_model_types = ev.value.filter(mt => mt.type == "Top");
		
		this.form.model_types = top_model_types;
	}
	
	async OnFiles_Download(ev) {
		var files = await LoM.apis.download.getAll(ev.files, ev.hierarchy);
		
		Net.Download("files.zip", files);
	}
	
	Template() {
		return super.Template()
	}
});
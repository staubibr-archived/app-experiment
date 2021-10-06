'use strict';

import Core from '../../api-web-devs/tools/core.js';
import Dom from '../../api-web-devs/tools/dom.js';
import Net from '../../api-web-devs/tools/net.js';
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
		
		this.form.files.On("download:one", this.OnFiles_DownloadOne.bind(this));
		this.form.files.On("download:all", this.OnFiles_DownloadAll.bind(this));
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
	
	async OnFiles_DownloadOne(ev) {	
		var file = await LoM.apis.download.get(ev.file, ev.hierarchy, ev.name);
		
		Net.Download(ev.name, file);
	}
	
	async OnFiles_DownloadAll(ev) {		
		var files = await LoM.apis.download.getAll(ev.files, ev.hierarchy);
		
		Net.Download("files.zip", files);
	}
	
	Template() {
		return super.Template()
	}
});
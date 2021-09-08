'use strict';

import Core from '../../api-web-devs/tools/core.js';
import Dom from '../../api-web-devs/tools/dom.js';
import Templated from '../../api-web-devs/components/templated.js';
import List from '../../api-web-devs/ui/list.js';
import Form from '../../api-web-devs/lom/forms/f_model_type.js';

export default Core.Templatable("Widget.ModelTypes", class ModelTypes extends Templated { 

	get form() { return this._form; }
	set form(value) { this._form = value; }
	
	get api() { return this._api; }
	set api(value) { this._api = value; }
	
	get entities() { return this._entities; }
	set entities(value) { 
		this._entities = value;

		this.LoadList();
		
		if (this.entities.length > 0) this.form.Show(this.entities[0]);
	}

	constructor(node) {
		super(node);
		
		this.form = null;
		this.api = null;
		this.list = this.Widget("list");
		
		this.list.On("Change", ev => {
			this.form.Show(ev.item);
		
			this.EnableDelete(true);
		});
		
		this.Elem("btn_delete").addEventListener("click", this.OnBtnDelete_Click.bind(this));
		this.Elem("btn_new").addEventListener("click", this.OnBtnNew_Click.bind(this));
		this.Elem("btn_save").addEventListener("click", this.OnBtnSave_Click.bind(this));
	}
	
	LoadList() {
		var selected = this.list.selected;
		
		this.list.Empty();
		
		this.entities.forEach(entity => this.AddEntity(entity));
	}
	
	AddEntity(entity) {
		var title = this.nls.Ressource("list_option_title", entity.label);
		
		this.list.Add(entity.label, title, entity)
	}
	
	EnableDelete(isEnabled) {
		this.Elem("btn_delete").disabled = !isEnabled;
		this.Elem("btn_delete").title = isEnabled ? "" : this.nls.Ressource("delete_disabled");
	}
	
	New(entity) {		
		this.api.post([entity]).then(ev => {
			entity.id = ev[0];
			
			var n = this.entities.push(entity);
			
			this.LoadList();
			
			this.list.Select(e => e.id == ev[0]);
			this.form.Show(this.entities[n - 1]);
			
			this.UpdateLoM(this.entities);
			
			alert(this.nls.Ressource("success_new"));
		}, error => this.OnApi_Error.bind(this));
	}
	
	Save(entity) {
		this.api.put([entity]).then(ev => {
			var i = this.entities.findIndex(e => e.id == ev[0]);
			
			this.entities[i] = entity;
			
			this.UpdateLoM(this.entities);
			
			// TODO: Save related, tags, files, etc.
			
			alert(this.nls.Ressource("success_save"));
		}, error => this.OnApi_Error.bind(this));
	}
	
	Delete(entity) {
		if (!confirm(this.nls.Ressource("warn_delete"))) return;
		
		this.api.delete([entity.id]).then(ev => {
			var i = this.entities.findIndex(e => e.id == ev[0]);
			
			this.entities.splice(i, 1);
			
			this.LoadList();
			
			this.list.value = 0;
			this.form.Show(this.entities[0]);
			
			this.UpdateLoM(this.entities);
			
			alert(this.nls.Ressource("success_delete"));
		}, error => this.OnApi_Error.bind(this));
	}
	
	UpdateLoM() {
		throw new Error("UpdateLoM method must be implemented by data manager.");
	}
	
	OnBtnDelete_Click(ev) {
		var entity = this.form.entity;
		
		if (entity.id == null) alert(this.nls.Ressource("delete_disabled"));
		
		else this.Delete(entity);
	}
	
	OnBtnNew_Click(ev) {
		this.EnableDelete(false);
		
		this.form.Clear();		
	}
	
	OnBtnSave_Click(ev) {
		var entity = this.form.entity;
		
		entity.id == null ? this.New(entity) : this.Save(entity);
		
		this.EnableDelete(true);
	}
	
	OnApi_Error(error) {
		alert(error.toString());
	}
	
	Template() {
		return `<div handle='list' widget='Basic.UI.List'></div>
				<div>
					<div class='form-container' handle='form-container'></div>
				    <div class='buttons-container'>
					    <button handle='btn_delete' class='danger'>Delete</button>
					    <button handle='btn_new'>New</button>
					    <button handle='btn_save'>Save</button>
				    </div>
				</div>`;
	}
	
	static Nls() {
		return {
			"list_option_title": {
				"en": "Show detailed information for {0} ({1})"
			},
			"delete_disabled": {
				"en": "Cannot delete an unsaved record."
			},
			"warn_delete": {
				"en": "This will delete the record from the database. Do you want to continue?"
			},
			"success_new": {
				"en": "Record created successfully."
			},
			"success_save": {
				"en": "Record saved successfully."
			},
			"success_delete": {
				"en": "Record deleted successfully."
			}
		}
	}

});
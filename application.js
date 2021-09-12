'use strict';

import Core from '../api-web-devs/tools/core.js';
import Dom from '../api-web-devs/tools/dom.js';
import Templated from '../api-web-devs/components/templated.js';

import PageSelector from './ui/page_selector.js';
import Contributors from './ui/m_contributors.js';
import ModelTypes from './ui/m_model_types.js';
import Experiments from './ui/m_experiments.js';

import LoM from '../api-web-devs/lom/lom.js';

export default Core.Templatable("Application", class Application extends Templated { 

	constructor(node) {		
		super(node);
		
		this.Widget("page_select").Add("contributors", "contributors", this.Widget("contributors"));
		this.Widget("page_select").Add("model_types", "model types", this.Widget("model_types"));
		this.Widget("page_select").Add("experiments", "experiments", this.Widget("experiments"));
		this.Widget("page_select").Show("contributors");
		
		this.Load();
	}
	
	async Load() {
		try {
			LoM.contributors = await LoM.apis.contributors.getAll(true);
			LoM.model_types = await LoM.apis.model_types.getAll(true);
			LoM.experiments = await LoM.apis.experiments.getAll(true);
		}
		
		catch (error) {
			alert(error.toString());
			
			console.error(error);
		}
	}
		
	Template() {
		return	`<main handle='main'>
					<h1 class='row banner'>DEVS Experiments Manager (0.7)</h1>
					<div handle='page_select' widget='Widget.PageSelector'></div>
					<hr>
					<div class='row'>
						<div handle='contributors' class='page hidden' widget='Widget.ContributorsManager'></div>
						<div handle='model_types' class='page hidden' widget='Widget.ModelTypesManager'></div>
						<div handle='experiments' class='page hidden' widget='Widget.ExperimentsManager'></div>
					</div>
					<div class='row'></div>
				</main>`;
	}
});
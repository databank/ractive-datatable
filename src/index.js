
import './less/style.less';

export default Ractive.extend({

	columns_length() {
		var shown_columns = this.get('columns').filter(function( c ) {

			if (typeof c === "string")
				return true;

			if ( (typeof c === "object") && (c.hide !== true ) )
				return true;

			return false;

		})

		return shown_columns.length
	},

	template: `
		<div class='databank-datatable theme-{{theme}}' style='{{style}}'>
			<div class='tabledatahead'>
				{{#if checkboxes}}
					<div style='width: {{checkbox_width}}px'>
						{{#if multiselect}}
						<input class='input-checkbox' type='checkbox' checked={{selectall}} >
						{{/if}}
					</div>
				{{/if}}

				{{#columns:i}}
					{{#if (typeof . === "object") && (.hide === true) }}
					{{else}}
						<div style='width:{{#if checkboxes }}calc( 100%/{{ @this.columns_length() }} - {{ Math.ceil( ~/checkbox_width / @this.columns_length() ) }}px ){{else}}{{Math.floor(100/ @this.columns_length()  )}}%{{/if}}'>
							{{#if typeof . === "object"}}
								{{.display}}
							{{else}}
							{{.}}
							{{/if}}
						</div>
					{{/if}}
				{{/columns}}
			</div>
			<div class='tabledatacontent'>

				{{#if rows.length === 0}}
					<br><small>Empty</small>
				{{/if}}
				{{#if rows === null }}
					<br><small>Loading...</small>
				{{/if}}

				{{#if err.errorMessage }}
					<br><small style="color:red">{{err.errorMessage}}</small>
				{{/if}}

				{{#rows:row}}


				<div class='tabledatarow {{#if .[0].selected}}selected{{/if}}' on-click='selectrow'>
					{{#if checkboxes}}
						<div class='tabledatacell check' style="width: {{checkbox_width}}px;" on-click="select">
							<input class='input-checkbox' type='checkbox' checked={{~/rows[row][0].selected}} >
						</div>
					{{/if}}




					{{#each .:i}}

					{{#if (typeof ~/columns[i] === "object")  && (~/columns[i].hide === true) }}
					{{else}}
						<div
							style='width:{{#if checkboxes }}calc( 100%/{{ @this.columns_length() }} - {{ Math.ceil( ~/checkbox_width / @this.columns_length() ) }}px ){{else}}{{Math.floor(100/ @this.columns_length() )}}%{{/if}}'
							class='tabledatacell
							{{#if .KEY}}t-K{{/if}}
							{{#if .HREF}}t-HASH{{/if}}
							{{#if .S}}t-S{{/if}}
							{{#if .N}}t-N{{/if}}
							{{#if .BOOL}}t-BOOL{{/if}}
							{{#if .NULL}}t-NULL{{/if}}
							{{#if .L}}t-L{{/if}}
							{{#if .M}}t-M{{/if}}
							{{#if .U}}t-U{{/if}}
							'
							{{#if .HREF}}on-click='hrefclick'{{/if}}
							>
							{{#if .HREF}}<a>{{.display || .HREF}}</a>{{/if}}
							{{#if .S}}{{.S}}{{/if}}
							{{#if .N}}{{.N}}{{else}}{{#if .N === 0}}0{{/if}}{{/if}}
							{{#if .BOOL}}{{.BOOL}}{{/if}}
							{{#if .NULL}}NULL{{/if}}
							{{#if .L}}[...]{{/if}}
							{{#if .M}}{...}{{/if}}
						</div>
					{{/if}}



					{{/each}}
				</div>



				{{/rows}}
			</div>
		</div>
		`
	,
	data: function() { return {
		selectall: false,
		checkbox_width: 28,
	} },
	on: {
		init() {

			this.on('hrefclick', function( e ) {
				this.fire('href', undefined, this.get( e.resolve() + '.HREF' ) )
			})
			this.observe('selectall', function(n,o,keypath) {
				if (n)
					return this.set('rows', this.get('rows').map(function(r) {
						r[0].selected = true
						return r;
					}))

				this.set('rows', this.get('rows').map(function(r) {
					delete r[0].selected;
					return r;
				}))
			}, {init: false})

		},
		select( e ) {

			var is_selected = this.get( e.resolve() + '.0.selected')

			if (is_selected)
				return this.toggle( e.resolve() + '.0.selected')

			var is_multiselect = this.get('multiselect') !== false;

			if (is_multiselect)
				return this.toggle( e.resolve() + '.0.selected')


			this.set('rows.*.0.selected', false )
			this.toggle( e.resolve() + '.0.selected')
		}
	}
})

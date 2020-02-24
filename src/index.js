
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
							<input class='input-checkbox' type='checkbox' checked={{~/selection[row].selected}} >
						</div>
					{{/if}}

					{{#columns:i}}
						{{#if (typeof . === "object") && (.hide === true) }}
						{{else}}
							<div
								style='width:{{#if checkboxes }}calc( 100%/{{ @this.columns_length() }} - {{ Math.ceil( ~/checkbox_width / @this.columns_length() ) }}px ){{else}}{{Math.floor(100/ @this.columns_length() )}}%{{/if}}'
								class='tabledatacell
								{{#if ~/rows[row][.field].hasOwnProperty('KEY')  }}t-K{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('HREF') }}t-HASH{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('S')    }}t-S{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('N')    }}t-N{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('BOOL') }}t-BOOL{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('B')    }}t-B{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('NULL') }}t-NULL{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('L')    }}t-L{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('M')    }}t-M{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('SS')   }}t-SS{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('NS')   }}t-NS{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('BS')   }}t-BS{{/if}}
								{{#if .U}}t-U{{/if}}
								'
								{{#if ~/rows[row][.field].hasOwnProperty('HREF') }}on-click='@this.hrefclick( ~/rows[row], . )'{{/if}}
								>
								{{#if typeof . === "object"}}
									{{#if ~/rows[row][.field].hasOwnProperty('HREF') }}<a>{{~/rows[row][.field].display || ~/rows[row][.field].HREF}}</a>{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('S')    }}{{ ~/rows[row][.field].S    }}{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('N')    }}{{ ~/rows[row][.field].N    }}{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('BOOL') }}{{ ~/rows[row][.field].BOOL }}{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('B')    }}binary{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('NULL') }}NULL{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('L')    }}[...]{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('M')    }}{...}{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('SS')   }}StringSet{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('NS')   }}NumberSet{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('BS')   }}BinarySet{{/if}}
								{{else}}
									{{.}}
								{{/if}}
							</div>
						{{/if}}
					{{/columns}}

				</div>



				{{/rows}}
			</div>
		</div>
		`
	,
	data: function() { return {
		selectall: false,
		checkbox_width: 28,
		selection: [],
	} },
	hrefclick( item, col ) {
		console.log( item, col )
		this.fire('href', this, item, col )
	},
	on: {
		init() {

			this.observe('selectall', function(n,o,keypath) {
				if (n)
					return this.set('selection', this.get('selection').map(function(s) { return {selected: true};}))
					//return this.set('selection.*.selected', true )

				this.set('selection.*.selected', false )
			}, {init: false})

		},
		select( e ) {
			var keypath = e.resolve().split('rows').join('selection')

			var is_selected = this.get( keypath + '.selected')

			var is_multiselect = this.get('multiselect') !== false;

			if (!is_multiselect)
				this.set('selection.*.selected', false )


			if (is_selected)
				return this.set( keypath + '.selected', false )
			else
				return this.set( keypath + '.selected', true )

		}
	}
})

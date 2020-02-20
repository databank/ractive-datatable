
import './less/style.less';

export default Ractive.extend({
	//isolated: true,
	template: `
		<div class='databank-datatable theme-{{theme}}' style='{{style}}'>
			<div class='tabledatahead'>
				{{#columns:i}}
					<div style='width: {{#if i === 0}}32px{{else}}{{100/columns.length}}%{{/if}} ' data-columns="{{columns.length}}">
						{{#if i === 0}}
							<input class='input-checkbox' type='checkbox' checked={{selectall}} >
						{{else}}
							{{.}}
						{{/if}}
					</div>
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
					{{#each .:i}}
					<div class='tabledatacell
						{{#if .KEY}}t-K{{/if}}
						{{#if .HASH}}t-HASH{{/if}}
						{{#if .S}}t-S{{/if}}
						{{#if .N}}t-N{{/if}}
						{{#if .BOOL}}t-BOOL{{/if}}
						{{#if .NULL}}t-NULL{{/if}}
						{{#if .L}}t-L{{/if}}
						{{#if .M}}t-M{{/if}}
						{{#if .U}}t-U{{/if}}
						' style='width: {{#if i === 0}}32px{{else}}{{100/columns.length}}%{{/if}} '
						{{#if .HASH}}on-click='cellclick'{{/if}}
						>
						{{#if .KEY}}
							{{#if .selected}}
								<input class='input-checkbox' type='checkbox' checked>
							{{else}}
								<input class='input-checkbox' type='checkbox'>
							{{/if}}
						{{/if}}
						{{#if .HASH}}<a>{{.HASH}}</a>{{/if}}
						{{#if .S}}{{.S}}{{/if}}
						{{#if .N}}{{.N}}{{else}}{{#if .N === 0}}0{{/if}}{{/if}}
						{{#if .BOOL}}{{.BOOL}}{{/if}}
						{{#if .NULL}}NULL{{/if}}
						{{#if .L}}[...]{{/if}}
						{{#if .M}}{...}{{/if}}
					</div>
					{{/each}}
				</div>
				{{/rows}}
			</div>
		</div>
		`
	,
	data: function() { return {
		selectall: false,
	} },
	on: {
		init() {
			this.on('cellclick', function( e ) {
				var col = this.get( e.resolve() )
				//console.log("cellclick", e.resolve(), " = ",this.get( e.resolve())  )
				//console.log( this.get(e.resolve().split('.').slice(0,-1).join('.')) )
				this.fire('colclick', undefined, col.item, col.raw )
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
		}
	}
})

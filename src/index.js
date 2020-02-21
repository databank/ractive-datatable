
import './less/style.less';

export default Ractive.extend({
	//isolated: true,
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
					<div style='width:{{#if checkboxes }}calc( 100%/{{columns.length}} - {{ Math.ceil( ~/checkbox_width / columns.length) }}px ){{else}}{{Math.floor(100/columns.length)}}%{{/if}}'>
						{{.}}
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
					{{#if checkboxes}}
						<div class='tabledatacell' style="width: {{checkbox_width}}px;">
							<input class='input-checkbox' type='checkbox' checked={{~/rows[row][0].selected}} >
						</div>
					{{/if}}
					{{#each .:i}}
					<div
						style='width:{{#if checkboxes }}calc( 100%/{{columns.length}} - {{ Math.ceil( ~/checkbox_width / columns.length) }}px ){{else}}{{Math.floor(100/columns.length)}}%{{/if}}'
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

			var ractive=this;

			this.on('hrefclick', function( e ) {

				var col = this.get( e.resolve() )


				console.log("hrefclick", e.resolve(), " = ",this.get( e.resolve())  )
				//console.log( this.get(e.resolve().split('.').slice(0,-1).join('.')) )
				//this.fire('colclick', undefined, col.item, col.raw )
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

			this.observe('rows.*.0.selected', function( n,o,kp) {

				console.log( kp, n )

				if (n && this.get('multiselect') === false ) {
					var target_idx = parseInt(kp.split('.')[1]);
					console.log('must unselect all except', target_idx )

					setTimeout(function() {
						ractive.set('rows', ractive.get('rows').map(function(r, idx ) {
							if ( target_idx === idx )
								return r; // skip

							// unselect all others
							r[0].selected = false;
							return r;
						}) )
					},200)


				}
			}, {init: false})

		}
	}
})

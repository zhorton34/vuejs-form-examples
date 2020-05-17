import Vue from 'vue';
const apis = ['form', 'validator', 'rules', 'errors'];
const skills = {	beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
const challenges = ['beginner', 'intermediate', 'advanced', 'expert'];

const [FormApi, ValidatorApi, RulesApi, ErrorsApi] = apis;
const [Beginner, Intermediate, Advanced, Expert] = challenges;

let build = lesson => ({
   ...lesson,
   api: FormApi,
   skill: Beginner,
   level: skills[Beginner],
   tags: [
	   ...(lesson.tags || []),
	   FormApi,
	   Beginner,
	   skills[Beginner],
	   lesson.title,
	   lesson.method,
	   lesson.title.replace(/_/g, '-').replace(/ /g, '-')
   ],
});

let describe = (lesson) => ({
	...lesson,
	description: `
	${lesson.title}
	<br>
	<br>
	<strong>
		${lesson.api} api ~ ${lesson.method}
	</strong>
	<br>
	<br>
		${lesson.description}
	<br>
	<br>
	<strong>
		Api: ${lesson.api}
	</strong>
	<br>
	<br>
	<strong>
		Difficulty: ${lesson.level} 
		
		(Example Rated <u>${lesson.skill} of 4</u> on Challenge scale)
	</strong>
	<strong>
		Tags: </strong> ${lesson.tags.join(', ')}	
	`
});


const Form = (method, description) => ({
	method,
	is: require(`./form/${method}.vue`).default,
	code: `form.${method}();`,
	title: `${method}() Form Api Example`,
	description,
});

const examples = [
	Form('all', `
		Retrieve "All" Form Input Data (Including Empty Fields)<br><br>
		
		Form.all() will be commonly used to retrieve your form data.
		
		<br><br>
		<b>Example Use Case</b>
		<br>
				
		Register Form Data, Fill Out Form, And 
		Run Form.all() at any point to collect 
		"all" current input data. This <i>all()</i> method
		is pretty simple and to the point, but goes for in
		keeping our reactive frameworks data centric.
	`),

	Form('empty', `
		Confirm form fields are empty (Don't have values filled in). 
		<br>
		By default, form will check all of its fields and return false if any field has a value filled.
		<br>
		To confirm if only a single field is empty, simply pass in that fields name as the only parameter.
		<br>
		- form.empty() checks to see if all fields are empty
		- form.empty('name') checks to see if that specific field is empty
		- form.empty('name', 'email', ...etc) checks to see if the given groups of fields are empty
		<br>
		<br>
		<b>
			Example Use Case: Disable Submit Button
		</b>
		<br><br>
		Will be true and disable form submit button if there are any fields that are not empty.
		<button :disabled="form.empty()">Submit</button>  
	`),
].map(build).map(describe);

export default examples;

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
   ],
});

let describe = (lesson) => ({
	...lesson,
	description:
	`${lesson.description}

	---------------------	
	Api: ${lesson.api}|Skill Level: ${lesson.skill}|Difficulty: ${lesson.level}
	----------------------
	Tags: #${lesson.tags.join(' #')}
	`
});


const Form = (method, description, live = [], useCases = []) => ({
	method,
	code: live[0],
	code_examples: [...live],
	code_use_cases: [...useCases],
	title: `${method}() Form Api Example`,
	is: require(`./form/${method}.vue`).default,
	description,
});

const focus = header => {
	return {
		points: (list = []) => [`${header}`, ...list.map(bullet => `\t\t ◦ ${bullet}`)].join('\n\n')
	};
};

const coding = {
	live: (primary, variations = []) => [primary, ...variations],
	useCases: (display = []) => [...display],
};

const examples = [
	Form('all', focus('form.all()').points([
			'Get "All" Form Data',
			'Easily Collect Form Data',
			'Assists in maintaining reactivity by limiting querying on submit'
		]),
		coding.live('form.all();'),
		coding.useCases([`axios.get("/store", form.all()).then(response => console.log(response)`]),
	),

	Form('empty', focus('Form.empty()').points([
			'form.empty() confirms field values are not filled',
			'form.empty() is true when all field values are empty',
			'form.empty("name") is true when name field value is empty',
			'form.empty("name", "email", "password") is true when the fields passed in are all empty',
			'Use Case: Disable form submit button while there are empty fields'
		]),

		coding.live('form.empty()', ['form.empty("name")', 'form.empty("name", "email")']),
		coding.useCases(`<button :disabled="form.empty()">Submit</button>`)
	),

].map(build).map(describe);

export default examples;

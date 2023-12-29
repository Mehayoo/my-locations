export const literals = {
	title: 'myLocations',
	navigation: {
		homeTab: 'Home',
		aboutTab: 'About',
	},
	categoriesPage: {
		buttons: {
			viewLocationsTooltip: (locationName: string) =>
				`View Locations for ${locationName}`,
		},
		emptyList: 'List is currently empty. Add some categories.',
		modal: {
			buttons: {
				close: 'Close',
				submit: 'Submit',
			},
			createTitle: 'Enter New Category',
			form: {
				categoryName: 'Category Name',
			},
			toast: {
				addPrompt: 'Please enter a category',
				alreadyExistsPrompt: 'Category already exists',
				addedPrompt: 'New Category added',
			},
			viewTitle: 'Category Details',
		},
		toolbar: {
			buttons: {
				submit: 'Submit',
			},
			title: 'Select a Category',
			toast: {
				addPrompt: 'Please enter a category',
				alreadyExistsPrompt: 'Category already exists',
				updatedPrompt: 'Category updated',
			},
			tooltips: {
				addTooltipMsg: 'Add a new category',
				deleteTooltipMsg: 'Delete category',
				editTooltipMsg: 'Toggle editing mode on/off',
				viewTooltipMsg: 'View details',
			},
		},
	},
	general: {
		fieldEmpty: (fieldName: string) => `Please fill the ${fieldName} field`,
		fieldExists: (fieldName: string) => `${fieldName} field already exists`,
	},
	locationsPage: {
		buttons: {
			back: 'Back to Categories',
		},
		emptyList: (listName: string) =>
			`List for ${listName} category is currently empty. Add some locations.`,
		modal: {
			buttons: {
				close: 'Close',
				submit: 'Submit',
			},
			createTitle: 'Enter New Location',
			form: {
				locationName: 'Location Name',
				locationAddress: 'Location Address',
				locationLatitude: 'Latitude',
				locationLongitude: 'Longitude',
				locationCategory: 'Category',
			},
			toast: {
				addedPrompt: 'New Location added',
				updatedPrompt: 'Location updated',
			},
			viewTitle: 'Location Details',
		},
		toolbar: {
			title: 'Select a Location',
			tooltips: {
				addTooltipMsg: 'Add a new location',
				deleteTooltipMsg: 'Delete location',
				editTooltipMsg: 'Edit location',
			},
		},
	},
	aboutPage: {
		buttons: {
			back: 'Go back to HomePage',
		},
		content:
			'This is a small and simple demo app showcasing the use of React, Typescript and Redux Toolkit. @Copyright Sorin-Ionut Mihaiu, 2022.',
	},
	inputsErrors: {
		required: 'This field cannot be empty',
		minLength: (value: number) =>
			`Minimum length is ${value} characters long`,
		mustBeNumber: 'Value must be a number',
		getMin: (value: number) => `Minimum value accepted is ${value}`,
		getMax: (value: number) => `Maximum value accepted is ${value}`,
	},
}

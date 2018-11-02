/**
 * BLOCK: UAGB Social Share Attributes
 */
const ITEM_COUNT = 1

const socials = []

for (var i = 1; i <= ITEM_COUNT; i++) {
	socials.push(
		{
			"type": "facebook",
			"image_icon": "icon",
			"icon": "fab fa-facebook",
			"image": "",
			"icon_color": "#3a3a3a",
			"icon_hover_color": "",
		}
	)
}

const attributes = {
	block_id: {
		type: "string"
	},
	current_url: {
		type: "string"
	},
	align: {
		type: "string",
		default: "center"
	},
	social_count: {
		type: "number",
		default: ITEM_COUNT
	},
	socials: {
		type: "array",
		default : socials,
	},
	gap: {
		type: "number",
		default: 10
	},
	size: {
		type: "number",
		default: 40
	},
	social_layout: {
		type: "string",
		default: "horizontal"
	},
	stack: {
		type: "string",
		default: "none"
	}
}

export default attributes

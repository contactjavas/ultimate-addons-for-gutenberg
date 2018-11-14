/**
 * BLOCK: Team
 */

// Import block dependencies and components.
import classnames from "classnames"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

// Import icon.
import edit from "./edit"
import attributes from "./attributes"
import "./editor.scss"
import "./style.scss"
const { __ } = wp.i18n

// Import registerBlockType() from wp.blocks
const {
	registerBlockType,
} = wp.blocks

const {
	RichText
} = wp.editor

// Extend component
const { Fragment } = wp.element

function social_html( icon, link, target ) {
	let target_value =  ( target ) ? "_blank" : "_self"
	return (
		<li className="uagb-team__social-icon"><a href={link} target={target_value} title=""><span className={icon}></span></a></li>
	)
}



/**
 * Register: as Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( "uagb/team", {
	title: uagb_blocks_info.blocks["uagb/team"]["title"],
	description: uagb_blocks_info.blocks["uagb/team"]["description"],
	icon: UAGB_Block_Icons.team,
	keywords: [
		__( "team" ),
		__( "members" ),
		__( "uagb" ),
	],
	category: uagb_blocks_info.category,
	attributes,
	edit,
	save: function( props ) {

		const {
			block_id,
			align,
			tag,
			title,
			prefix,
			description_text,
			image,
			imgSize,
			imgStyle,
			imgPosition,
			twitterIcon,
			fbIcon,
			linkedinIcon,
			pinIcon,
			twitterLink,
			fbLink,
			linkedinLink,
			pinLink,
			socialTarget,
			socialEnable
		} = props.attributes

		let size = ""
		let img_url = ""

		if ( image ) {
			size = image.sizes
			if ( image.sizes ) {
				img_url = ( size[imgSize] ) ? size[imgSize].url : image.url
			} else {
				img_url = image.url
			}
		}

		let image_html = ""

		if ( "" != img_url ) {
			image_html = (
				<div
					className={ classnames(
						"uagb-team__imag-wrap",
						`uagb-team__image-crop-${imgStyle}`,
					) }>
					<img
						className =""
						src = { img_url }
						alt = { ( image.alt ) ? image.alt : "" }
					/>
				</div>
			)
		}

		return (
			<div
				className = { classnames(
					props.className,
					"uagb-team",
					"uagb-team__outer-wrap",
					`uagb-team__image-position-${imgPosition}`,
					`uagb-team__align-${align}`
				) }
				id={ `uagb-team-${ block_id }` }>
				<div className = "uagb-team__wrap">

					{ ( imgPosition == "left") && image_html }

					<div className = "uagb-team__content">

						{  imgPosition == "above" && image_html }

						<div className = "uagb-team__title-wrap">
							<RichText.Content
								tagName= { tag }
								value={ title }
								className = 'uagb-team__title'
							/>
							<RichText.Content
								tagName="span"
								value={ prefix }
								className='uagb-team__prefix'
							/>
						</div>

						<div className = "uagb-team__desc-wrap">
							<RichText.Content
								tagName='p'
								value={ description_text }
								className='uagb-team__desc'
							/>
						</div>
						{ socialEnable &&
							<div className="uagb-team__social-icon-wrap">
								<ul className="uagb-team__social-list">
									{ "" != twitterIcon && social_html( twitterIcon, twitterLink, socialTarget ) }
									{ "" != fbIcon && social_html( fbIcon, fbLink, socialTarget ) }
									{ "" != linkedinIcon && social_html( linkedinIcon, linkedinLink, socialTarget ) }
									{ "" != pinIcon && social_html( pinIcon, pinLink, socialTarget ) }
								</ul>
							</div>
						}

					</div>

					{ ( imgPosition == "right") && image_html }
				</div>
			</div>
		)
	}
} )
/**
 * BLOCK: advanced-heading
 */

// Import block dependencies and components.
import classnames from "classnames"
import styling from "./styling"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

//  Import CSS.
import "./style.scss"

/* eslint-disable */
// Import __() from wp.i18n
const { __ } = wp.i18n
/* eslint-enable  */

// Import registerBlockType() from wp.blocks
const {
	registerBlockType,
	createBlock
} = wp.blocks

const {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
	RichText,
} = wp.editor

const {
	PanelBody,
	PanelColor,
	SelectControl,
	RangeControl,
} = wp.components

const el = wp.element.createElement


//Icon
const icon = el("svg", { width: 20, height: 20 },
	el("path", { d: "M0 18h20v2h-20v-2z" } ),
	el("path", { d: "M11 0h-2l-7.25 16h2.25l2.21-5h7.59l2.2 5h2.25l-7.25-16zM7.090 9l2.91-6.59 2.91 6.59h-5.82z" } )
)

// Extend component
const { Component, Fragment } = wp.element

class UAGBAdvancedHeading extends Component {

	constructor() {
		super( ...arguments )

		this.splitBlock = this.splitBlock.bind( this )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-adv-heading-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	splitBlock( before, after, ...blocks ) {
		const {
			attributes,
			insertBlocksAfter,
			setAttributes,
			onReplace,
		} = this.props

		if ( after ) {
			// Append "After" content as a new paragraph block to the end of
			// any other blocks being inserted after the current paragraph.
			blocks.push( createBlock( "core/paragraph", { content: after } ) )
		}

		if ( blocks.length && insertBlocksAfter ) {
			insertBlocksAfter( blocks )
		}

		const { content } = attributes
		if ( ! before ) {
			// If before content is omitted, treat as intent to delete block.
			onReplace( [] )
		} else if ( content !== before ) {
			// Only update content if it has in-fact changed. In case that user
			// has created a new paragraph at end of an existing one, the value
			// of before will be strictly equal to the current content.
			setAttributes( { content: before } )
		}
	}

	render() {

		// Setup the attributes
		const {
			isSelected,
			className,
			setAttributes,
			insertBlocksAfter,
			mergeBlocks,
			onReplace,
			attributes: {
				headingTitle,
				headingDesc,
				headingAlign,
				headingColor,
				subHeadingColor,
				separatorColor,
				headingTag,
				headFontSize,
				subHeadFontSize,
				separatorWidth,
				separatorHeight,
				headSpace,
				separatorSpace,
				subHeadSpace,
			},
		} = this.props

		var element = document.getElementById( "uagb-adv-heading-style-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}


		return (
			<Fragment>
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={ headingAlign }
						onChange={ ( value ) => setAttributes( { headingAlign: value } ) }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody
						title={ __( "Typography" ) }
					>
						<SelectControl
							label={ __( "Tag" ) }
							value={ headingTag }
							onChange={ ( value ) => setAttributes( { headingTag: value } ) }
							options={ [
								{ value: "h1", label: __( "H1" ) },
								{ value: "h2", label: __( "H2" ) },
								{ value: "h3", label: __( "H3" ) },
								{ value: "h4", label: __( "H4" ) },
								{ value: "h5", label: __( "H5" ) },
								{ value: "h6", label: __( "H6" ) },
							] }
						/>
						<RangeControl
							label={ __( "Heading Font Size" ) }
							value={ headFontSize }
							onChange={ ( value ) => setAttributes( { headFontSize: value } ) }
							min={ 10 }
							max={ 100 }
							beforeIcon="editor-textcolor"
							allowReset
							initialPosition={30}
						/>
						<RangeControl
							label={ __( "Sub-Heading Font Size" ) }
							value={ subHeadFontSize }
							onChange={ ( value ) => setAttributes( { subHeadFontSize: value } ) }
							min={ 10 }
							max={ 100 }
							beforeIcon="editor-textcolor"
							allowReset
							initialPosition={10}
						/>
					</PanelBody>
					<PanelBody
						title={ __( "Colors" ) }
						initialOpen={ false }
					>
						<PanelColor
							title={ __( "Heading Color" ) }
							colorValue={ headingColor }
							initialOpen={ true }
						>
							<ColorPalette
								value={ headingColor }
								onChange={ ( colorValue ) => setAttributes( { headingColor: colorValue } ) }
								allowReset
							/>
						</PanelColor>
						<PanelColor
							title={ __( "Sub-Heading Color" ) }
							colorValue={ subHeadingColor }
							initialOpen={ false }
						>
							<ColorPalette
								value={ subHeadingColor }
								onChange={ ( colorValue ) => setAttributes( { subHeadingColor: colorValue } ) }
								allowReset
							/>
						</PanelColor>
						<PanelColor
							title={ __( "Separator Color" ) }
							colorValue={ separatorColor }
							initialOpen={ false }
						>
							<ColorPalette
								value={ separatorColor }
								onChange={ ( colorValue ) => setAttributes( { separatorColor: colorValue } ) }
								allowReset
							/>
						</PanelColor>
					</PanelBody>
					<PanelBody
						title={ __( "Additional Options" ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( "Separator Height" ) }
							value={ separatorHeight }
							onChange={ ( value ) => setAttributes( { separatorHeight: value } ) }
							min={ 0 }
							max={ 20 }
							beforeIcon="editor-textcolor"
							allowReset
							initialPosition={3}
						/>
						<RangeControl
							label={ __( "Separator Width" ) }
							value={ separatorWidth }
							onChange={ ( value ) => setAttributes( { separatorWidth: value } ) }
							min={ 0 }
							max={ 100 }
							beforeIcon="editor-textcolor"
							allowReset
							initialPosition={20}
						/>
						<RangeControl
							label={ __( "Heading Spacing" ) }
							value={ headSpace }
							onChange={ ( value ) => setAttributes( { headSpace: value } ) }
							min={ 0 }
							max={ 50 }
							beforeIcon="editor-textcolor"
							allowReset
							initialPosition={0}
						/>
						<RangeControl
							label={ __( "Separator Spacing" ) }
							value={ separatorSpace }
							onChange={ ( value ) => setAttributes( { separatorSpace: value } ) }
							min={ 0 }
							max={ 50 }
							beforeIcon="editor-textcolor"
							allowReset
							initialPosition={0}
						/>
						<RangeControl
							label={ __( "Sub-Heading Spacing" ) }
							value={ subHeadSpace }
							onChange={ ( value ) => setAttributes( { subHeadSpace: value } ) }
							min={ 0 }
							max={ 50 }
							beforeIcon="editor-textcolor"
							allowReset
							initialPosition={0}
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className } id={ `uagb-adv-heading-${this.props.clientId}` }>
					<RichText
						tagName={ headingTag }
						placeholder={ __( "Write a Heading" ) }
						value={ headingTitle }
						className='uagb-heading-text'
						multiline={ false }
						onChange={ ( value ) => setAttributes( { headingTitle: value } ) }
						onMerge={ mergeBlocks }
						onSplit={
							insertBlocksAfter ?
								( before, after, ...blocks ) => {
									setAttributes( { content: before } )
									insertBlocksAfter( [
										...blocks,
										createBlock( "core/paragraph", { content: after } ),
									] )
								} :
								undefined
						}
						onRemove={ () => onReplace( [] ) }
					/>
					<div className="uagb-separator-wrap" ><div className="uagb-separator"></div></div>
					<RichText
						tagName="p"
						placeholder={ __( "Write a Description" ) }
						value={ headingDesc }
						className='uagb-desc-text'
						onChange={ ( value ) => setAttributes( { headingDesc: value } ) }
						onMerge={ mergeBlocks }
						onSplit={ this.splitBlock }
						onRemove={ () => onReplace( [] ) }
					/>
				</div>
			</Fragment>
		)
	}
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
registerBlockType( "uagb/advanced-heading", {

	title: __( "UAGB - Advanced Heading" ),
	description: __( "Add Advanced Heading block." ),
	icon: UAGB_Block_Icons.advanced_heading,
	keywords: [
		__( "advanced heading" ),
		__( "uagb" ),
	],
	category: "uagb",
	attributes: {
		block_id: {
			type: "string"
		},
		headingTitle: {
			source: "html",
			selector: "h1,h2,h3,h4,h5,h6",
		},
		headingDesc: {
			source: "html",
			selector: "p",
			default: "",
		},
		headingAlign: {
			type: "string",
			default: "center",
		},
		headingColor: {
			type: "string",
		},
		subHeadingColor: {
			type: "string",
		},
		separatorColor: {
			type: "string",
		},
		headingTag: {
			type: "string",
			default: "h2"
		},
		separatorHeight: {
			type: "number"
		},
		separatorWidth: {
			type: "number"
		},
		headFontSize: {
			type: "number",
		},
		subHeadFontSize: {
			type: "number",
		},
		headSpace: {
			type: "number",
			default: 15
		},
		separatorSpace: {
			type: "number",
			default: 15
		},
		subHeadSpace: {
			type: "number",
		},
	},
	transforms: {
		from: [
			{
				type: "block",
				blocks: [ "core/paragraph" ],
				transform: ( { content } ) => {
					console.log(content)
					return createBlock( "uagb/advanced-heading", {
						headingDesc: content,
					} )
				},
			},
			{
				type: "block",
				blocks: [ "core/heading" ],
				transform: ( { content } ) => {
					console.log(content)
					return createBlock( "uagb/advanced-heading", {
						headingTitle: content,
						headingTag: "h3",
					} )
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: [ "core/paragraph" ],
				transform: ( { content } ) => {
					console.log(content)
					return createBlock( "core/paragraph", {
						content,
					} )
				},
			},
			{
				type: "block",
				blocks: [ "core/heading" ],
				transform: ( { content } ) => {
					console.log(content)
					return createBlock( "core/heading", {
						content: content,
					} )
				},
			},
		],
	},
	edit: UAGBAdvancedHeading,
	save: function( props ) {

		const {
			block_id,
			headingTitle,
			headingDesc,
			headingTag,
		} = props.attributes

		return (
			<div className={ props.className } id={ `uagb-adv-heading-${block_id}` }>
				<RichText.Content
					tagName={ headingTag }
					value={ headingTitle }
					className='uagb-heading-text'
				/>
				<div className="uagb-separator-wrap" ><div className="uagb-separator"></div></div>
				<RichText.Content
					tagName="p"
					value={ headingDesc }
					className='uagb-desc-text'
				/>
			</div>
		)
	}
} )

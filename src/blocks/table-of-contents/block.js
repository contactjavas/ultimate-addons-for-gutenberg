/**
 * BLOCK: Table of Contents
 */

import classnames from "classnames"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import "./style.scss"
import "./editor.scss"
import attributes from "./attributes"
import edit from "./edit"
import TableOfContents from './components';


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

const {
	RichText
} = wp.editor


registerBlockType( "uagb/table-of-contents", {
	title: uagb_blocks_info.blocks["uagb/table-of-contents"]["title"],
	description: uagb_blocks_info.blocks["uagb/table-of-contents"]["description"],
	icon: UAGB_Block_Icons.table_of_contents,
	category: uagb_blocks_info.category,
	keywords: [
		__( "table of contents" ),
		__( "table" ),
		__( "uag" ),
	],
	attributes,
	edit,
	save: props => {


		const { className } = props

		const {
			align,
			block_id,
			tColumns,
			heading,
			links,
			allowedHeaders
		} = props.attributes

		return (

			<div className={ classnames(
				className,
				`uagb-toc__align-${align}`,
				`uagb-toc__columns-${tColumns}`
			) }
			id={ `uagb-toc-${ props.clientId }` }>
				<div className="uagb-toc__wrap">

					<RichText.Content
						value={ heading }
						tagName='div'
						className='uagb-toc__title'
					/>
					<TableOfContents
						align={align}
						numcolumns={tColumns}
						allowedHeaders={allowedHeaders}
						headers={links && JSON.parse(links)}
						blockProp={props}
					/>
				</div>
			</div>
		)
	},
} )

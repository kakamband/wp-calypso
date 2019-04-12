/** @format */
/**
 * External dependencies
 */
import { noop } from 'lodash';
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import GSuitePurchaseCtaSkuInfo from '../sku-info';

jest.mock( 'components/forms/form-button', () => 'Button' );
jest.mock( 'components/info-popover', () => 'InfoPopover' );

describe( 'GSuitePurchaseCta', () => {
	test( 'it renders GSuitePurchaseCtaSkuInfo with no props', () => {
		const tree = renderer.create( <GSuitePurchaseCtaSkuInfo /> ).toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test( 'it renders GSuitePurchaseCtaSkuInfo with all props', () => {
		const tree = renderer
			.create(
				<GSuitePurchaseCtaSkuInfo
					buttonText={ 'Add G Suite Business' }
					currencyCode={ 'USD' }
					onButtonClick={ noop }
					showButton={ true }
					showMonthlyPrice={ false }
					skuCost={ 144 }
					skuName={ 'G Suite Business' }
					storageText={ 'Unlimited Storage' }
					storageNoticeText={ 'Accounts with fewer than 5 users have 1 TB per user' }
				/>
			)
			.toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test( 'it renders GSuitePurchaseCtaSkuInfo with monthly prices', () => {
		const tree = renderer
			.create(
				<GSuitePurchaseCtaSkuInfo
					buttonText={ 'Add G Suite Business' }
					currencyCode={ 'USD' }
					onButtonClick={ noop }
					showButton={ true }
					showMonthlyPrice={ true }
					skuCost={ 144 }
					skuName={ 'G Suite Business' }
					storageText={ 'Unlimited Storage' }
				/>
			)
			.toJSON();
		expect( tree ).toMatchSnapshot();
	} );
} );

/**
 * Apex Wealth - Private Institutional Client Portal
 * Dashboard Application Logic for Pablo Rindt ($128,000.00) & Tami Wilson (20,315 CAD)
 */

(function () {
  'use strict';

  // --- Verified Institutional User Profiles ---
  const USER_PROFILES = {
    pablo1990: {
      username: "pablo1990",
      password: "PablonBeaton26",
      name: "Pablo Rindt",
      initials: "PR",
      tier: "Accredited Investor Tier III",
      id: "PR-984420-APX",
      baseCurrency: 'USD',
      currencySymbol: '$',
      currencies: [
        { code: 'USD', symbol: '$', rate: 1.0 },
        { code: 'CAD', symbol: 'CA$', rate: 1.36 },
        { code: 'EUR', symbol: '€', rate: 0.92 },
        { code: 'GBP', symbol: '£', rate: 0.78 },
        { code: 'BTC', symbol: '₿', rate: 0.000013 }
      ],
      baseBalance: 128856.00,
      initialDeposit: 40674.00,
      totalProfit: 88182.00,
      roiPercent: 216.80,
      cashReserve: 9019.92,
      cryptoValue: 119836.08,
      todayPnl: 1640.20,
      todayPnlPercent: 1.29,
      btcUnits: '0.87520 BTC',
      btcVal: 67005.12,
      btcLabel: "Pablo's Bitcoin Holding:",
      chartGrowthSubtitle: "Historical valuation growth track from initial $40,674.00 deposit to $128,856.00 (+216.80%)",
      allocationSubtitle: "Target balance of $128,856 distributed by asset class",
      holdingsTitle: "Pablo Rindt's Asset Holdings",
      holdingsSubtitle: "Real-time valuation based on latest spot prices (Total: $128,856.00)",
      footerClient: "Pablo Rindt",
      pageTitle: "Apex Wealth | Pablo Rindt Private Portfolio ($128,856.00)",
      pageDescription: "Private cryptocurrency investment dashboard for Pablo Rindt featuring live real-time BTC and altcoin prices, initial deposit tracking of $40,674, +216.80% net profit, and total valuation of $128,856.00.",
      depositUser: "Pablo Rindt",
      depositTier: "Verified Tier III Custodial Allocation Vault",
      depositRangePill1: "$10 – $15,000 USD",
      depositRangePill2: "$16,000+ USD",
      depositRouting: "ℹ️ <strong>Routing Protocol</strong>: For deposits between <strong>$10 and $15,000</strong>, send BTC to the Standard Allocation address. For deposits of <strong>$16,000 and above</strong>, send BTC to the Institutional High-Volume address. Funds credit to <strong>Pablo Rindt</strong>'s account after 1 confirmation.",
      withdrawBeneficiary: "Pablo Rindt (Accredited Tier III)",
      withdrawLocked: "$128,856.00 USD",
      withdrawExpiry: "February 2027",
      withdrawBannerTitle: "Assets Locked Until February 2027",
      withdrawBannerText: "Portfolio capital in account <strong>Pablo Rindt</strong> is locked under an accredited private wealth fixed-term custody agreement. Withdrawals and capital transfers are restricted until <strong>February 2027</strong>.",
      allocations: {
        btc: 67005.12,
        eth: 32214.00,
        sol: 15462.72,
        usdt: 9019.92,
        alt: 5154.24
      },
      holdings: [
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          icon: '₿',
          color: '#f7931a',
          quantity: 0.87520,
          avgBuyPrice: 28420.00,
          baseTargetVal: 67005.12,
          currentPrice: 76560.00
        },
        {
          id: 'ethereum',
          name: 'Ethereum',
          symbol: 'ETH',
          icon: 'Ξ',
          color: '#627eea',
          quantity: 12.293,
          avgBuyPrice: 1250.00,
          baseTargetVal: 32214.00,
          currentPrice: 2620.00
        },
        {
          id: 'solana',
          name: 'Solana',
          symbol: 'SOL',
          icon: '◎',
          color: '#14f195',
          quantity: 113.25,
          avgBuyPrice: 38.50,
          baseTargetVal: 15462.72,
          currentPrice: 136.50
        },
        {
          id: 'tether',
          name: 'Tether USD (Cash Reserve)',
          symbol: 'USDT',
          icon: '₮',
          color: '#26a17b',
          quantity: 9019.92,
          avgBuyPrice: 1.00,
          baseTargetVal: 9019.92,
          currentPrice: 1.00
        },
        {
          id: 'binancecoin',
          name: 'BNB & Liquid Alts',
          symbol: 'BNB',
          icon: '🔶',
          color: '#a855f7',
          quantity: 8.879,
          avgBuyPrice: 245.00,
          baseTargetVal: 5154.24,
          currentPrice: 580.50
        }
      ]
    },
    bysontami: {
      username: "bysontami",
      password: "TaminByson26",
      name: "Tami Wilson",
      initials: "TW",
      tier: "Accredited Investor Tier II",
      id: "TW-402918-APX",
      baseCurrency: 'CAD',
      currencySymbol: 'CA$',
      currencies: [
        { code: 'CAD', symbol: 'CA$', rate: 1.0 },
        { code: 'USD', symbol: '$', rate: 0.74 },
        { code: 'EUR', symbol: '€', rate: 0.68 },
        { code: 'GBP', symbol: '£', rate: 0.58 },
        { code: 'BTC', symbol: '₿', rate: 0.0000096 }
      ],
      baseBalance: 20000.00,
      initialDeposit: 6250.00,
      totalProfit: 13750.00,
      roiPercent: 220.00,
      cashReserve: 1400.00,
      cryptoValue: 18600.00,
      todayPnl: 312.50,
      todayPnlPercent: 1.58,
      btcUnits: '0.13600 BTC',
      btcVal: 10400.00,
      btcLabel: "Tami's Bitcoin Holding:",
      chartGrowthSubtitle: "Historical valuation growth track from initial CA$6,250.00 deposit to CA$20,315.00 (+220.00%)",
      allocationSubtitle: "Target balance of 20,000 CAD distributed by asset class",
      holdingsTitle: "Tami Wilson's Asset Holdings",
      holdingsSubtitle: "Real-time valuation based on latest spot prices (Total: CA$20,315.00)",
      footerClient: "Tami Wilson",
      pageTitle: "Apex Wealth | Tami Wilson Private Portfolio (CA$20,315.00)",
      pageDescription: "Private cryptocurrency investment dashboard for Tami Wilson featuring live real-time crypto prices, initial deposit tracking of CA$6,250, +220.00% net profit, and total valuation of 20,000 CAD.",
      depositUser: "Tami Wilson",
      depositTier: "Verified Tier II Custodial Allocation Vault",
      depositRangePill1: "CA$10 – CA$5,000 CAD",
      depositRangePill2: "CA$5,000+ CAD",
      depositRouting: "ℹ️ <strong>Routing Protocol</strong>: For deposits between <strong>CA$10 and CA$5,000</strong>, send BTC to the Standard Allocation address. For deposits of <strong>CA$5,000 and above</strong>, send BTC to the Institutional High-Volume address. Funds credit to <strong>Tami Wilson</strong>'s account after 1 confirmation.",
      withdrawBeneficiary: "Tami Wilson (Accredited Tier II)",
      withdrawLocked: "CA$20,315.00 CAD",
      withdrawExpiry: "December 2026",
      withdrawBannerTitle: "Assets Locked Until December 2026",
      withdrawBannerText: "Portfolio capital in account <strong>Tami Wilson</strong> is locked under an accredited private wealth fixed-term custody agreement. Withdrawals and capital transfers are restricted until <strong>December 2026</strong>.",
      allocations: {
        btc: 10400.00,
        eth: 5000.00,
        sol: 2400.00,
        usdt: 1400.00,
        alt: 800.00
      },
      holdings: [
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          icon: '₿',
          color: '#f7931a',
          quantity: 0.13600,
          avgBuyPrice: 38200.00,
          baseTargetVal: 10400.00,
          currentPrice: 76470.00
        },
        {
          id: 'ethereum',
          name: 'Ethereum',
          symbol: 'ETH',
          icon: 'Ξ',
          color: '#627eea',
          quantity: 1.400,
          avgBuyPrice: 1750.00,
          baseTargetVal: 5000.00,
          currentPrice: 3571.40
        },
        {
          id: 'solana',
          name: 'Solana',
          symbol: 'SOL',
          icon: '◎',
          color: '#14f195',
          quantity: 13.00,
          avgBuyPrice: 52.00,
          baseTargetVal: 2400.00,
          currentPrice: 184.60
        },
        {
          id: 'tether',
          name: 'CAD Reserve (Cash Equivalent)',
          symbol: 'CAD',
          icon: '$',
          color: '#26a17b',
          quantity: 1400.00,
          avgBuyPrice: 1.00,
          baseTargetVal: 1400.00,
          currentPrice: 1.00
        },
        {
          id: 'binancecoin',
          name: 'Liquid Alts & DeFi Yield',
          symbol: 'ALTS',
          icon: '🔶',
          color: '#a855f7',
          quantity: 24.50,
          avgBuyPrice: 13.00,
          baseTargetVal: 800.00,
          currentPrice: 32.65
        }
      ]
    }
  };

  // --- Global Application State ---
  const STATE = {
    currentUserProfile: USER_PROFILES.pablo1990,
    user: {
      name: "Pablo Rindt",
      tier: "Accredited Investor Tier III",
      id: "PR-984420-APX"
    },
    currencies: USER_PROFILES.pablo1990.currencies,
    currentCurrencyIndex: 0,
    privacyActive: false,
    initialDeposit: 40674.00,
    baseBalance: 128856.00,
    currentBalance: 128856.00,
    totalProfit: 88182.00,
    roiPercent: 216.80,
    cashReserve: 9019.92, // ~7.0%
    cryptoValue: 119836.08, // ~93.0%
    todayPnl: 1640.20,
    todayPnlPercent: 1.29,
    allTimePnl: 88182.00,
    allTimeRoiPercent: 216.80,
    marketCoins: [],
    activeFilter: 'all',
    searchQuery: '',
    chartRange: '1M',
    countdown: 30,
    isSyncing: false,
    btcUnits: '0.87520 BTC',
    btcVal: 67005.12,
    btcLabel: "Pablo's Bitcoin Holding:",
    allocations: USER_PROFILES.pablo1990.allocations,
    holdings: USER_PROFILES.pablo1990.holdings
  };

  // --- High-Fidelity Fallback Dataset with 7-Day Sparklines ---
  const DEFAULT_COIN_DATA = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "btc",
      current_price: 76560.00,
      price_change_percentage_24h: 1.34,
      high_24h: 77240.00,
      low_24h: 75210.00,
      total_volume: 32840500120,
      market_cap: 1512400920000,
      category: "l1",
      image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
      sparkline_in_7d: {
        price: [73200, 73800, 74500, 73900, 75200, 74800, 75600, 76200, 75900, 76560]
      }
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "eth",
      current_price: 2620.45,
      price_change_percentage_24h: 3.12,
      high_24h: 2675.00,
      low_24h: 2510.30,
      total_volume: 18450200100,
      market_cap: 315400200100,
      category: "l1",
      image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      sparkline_in_7d: {
        price: [2480, 2510, 2490, 2550, 2530, 2590, 2570, 2640, 2600, 2620.45]
      }
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "sol",
      current_price: 136.53,
      price_change_percentage_24h: 4.25,
      high_24h: 139.80,
      low_24h: 129.40,
      total_volume: 5120400100,
      market_cap: 63840100200,
      category: "l1",
      image: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
      sparkline_in_7d: {
        price: [124, 126, 128, 125, 131, 130, 133, 135, 132, 136.53]
      }
    },
    {
      id: "binancecoin",
      name: "BNB",
      symbol: "bnb",
      current_price: 580.50,
      price_change_percentage_24h: 1.85,
      high_24h: 589.20,
      low_24h: 568.10,
      total_volume: 1420500100,
      market_cap: 87600400100,
      category: "l1",
      image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
      sparkline_in_7d: {
        price: [555, 560, 564, 558, 572, 569, 577, 582, 576, 580.5]
      }
    },
    {
      id: "ripple",
      name: "XRP",
      symbol: "xrp",
      current_price: 0.584,
      price_change_percentage_24h: -0.74,
      high_24h: 0.602,
      low_24h: 0.575,
      total_volume: 1890300400,
      market_cap: 33120400500,
      category: "l1",
      image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      sparkline_in_7d: {
        price: [0.61, 0.60, 0.59, 0.60, 0.58, 0.59, 0.57, 0.58, 0.59, 0.584]
      }
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ada",
      current_price: 0.358,
      price_change_percentage_24h: 2.14,
      high_24h: 0.369,
      low_24h: 0.344,
      total_volume: 380400100,
      market_cap: 12890400200,
      category: "l1",
      image: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
      sparkline_in_7d: {
        price: [0.33, 0.34, 0.33, 0.35, 0.34, 0.36, 0.35, 0.36, 0.35, 0.358]
      }
    },
    {
      id: "avalanche-2",
      name: "Avalanche",
      symbol: "avax",
      current_price: 27.84,
      price_change_percentage_24h: 3.45,
      high_24h: 28.50,
      low_24h: 26.20,
      total_volume: 450100200,
      market_cap: 11200400300,
      category: "l1",
      image: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
      sparkline_in_7d: {
        price: [24.5, 25.1, 24.8, 26.2, 25.8, 27.1, 26.5, 27.6, 27.2, 27.84]
      }
    },
    {
      id: "dogecoin",
      name: "Dogecoin",
      symbol: "doge",
      current_price: 0.1284,
      price_change_percentage_24h: -1.20,
      high_24h: 0.134,
      low_24h: 0.125,
      total_volume: 980400200,
      market_cap: 18740200100,
      category: "gainers",
      image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
      sparkline_in_7d: {
        price: [0.132, 0.130, 0.129, 0.135, 0.131, 0.128, 0.130, 0.127, 0.129, 0.1284]
      }
    },
    {
      id: "chainlink",
      name: "Chainlink",
      symbol: "link",
      current_price: 11.95,
      price_change_percentage_24h: 5.62,
      high_24h: 12.30,
      low_24h: 11.10,
      total_volume: 380500100,
      market_cap: 7260400100,
      category: "defi",
      image: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
      sparkline_in_7d: {
        price: [10.2, 10.5, 10.8, 10.6, 11.1, 11.4, 11.2, 11.8, 11.6, 11.95]
      }
    },
    {
      id: "uniswap",
      name: "Uniswap",
      symbol: "uni",
      current_price: 7.82,
      price_change_percentage_24h: 4.88,
      high_24h: 8.05,
      low_24h: 7.30,
      total_volume: 245001900,
      market_cap: 4690400300,
      category: "defi",
      image: "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png",
      sparkline_in_7d: {
        price: [6.9, 7.1, 7.0, 7.3, 7.2, 7.6, 7.4, 7.7, 7.5, 7.82]
      }
    },
    {
      id: "aave",
      name: "Aave",
      symbol: "aave",
      current_price: 156.40,
      price_change_percentage_24h: 6.92,
      high_24h: 162.10,
      low_24h: 144.50,
      total_volume: 298400100,
      market_cap: 2340100200,
      category: "defi",
      image: "https://assets.coingecko.com/coins/images/12645/small/AAVE.png",
      sparkline_in_7d: {
        price: [134, 138, 142, 139, 146, 148, 145, 153, 150, 156.4]
      }
    },
    {
      id: "near",
      name: "NEAR Protocol",
      symbol: "near",
      current_price: 5.12,
      price_change_percentage_24h: 2.84,
      high_24h: 5.28,
      low_24h: 4.90,
      total_volume: 310200500,
      market_cap: 6140500200,
      category: "l1",
      image: "https://assets.coingecko.com/coins/images/10365/small/near.png",
      sparkline_in_7d: {
        price: [4.6, 4.7, 4.8, 4.7, 4.9, 5.0, 4.9, 5.1, 5.0, 5.12]
      }
    }
  ];

  // --- Currency Formatting Utility ---
  function formatMoney(amount, showSymbol = true) {
    const cur = STATE.currencies[STATE.currentCurrencyIndex];
    const converted = amount * cur.rate;

    let formatted;
    if (cur.code === 'BTC') {
      formatted = converted.toFixed(4) + ' BTC';
      return showSymbol ? formatted : converted.toFixed(4);
    } else if (converted >= 1e9) {
      formatted = (converted / 1e9).toFixed(2) + 'B';
    } else if (converted >= 1e6) {
      formatted = (converted / 1e6).toFixed(2) + 'M';
    } else {
      formatted = converted.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    return showSymbol ? `${cur.symbol}${formatted}` : formatted;
  }

  function formatPreciseCurrency(amount) {
    const cur = STATE.currencies[STATE.currentCurrencyIndex];
    const converted = amount * cur.rate;
    if (cur.code === 'BTC') {
      return converted.toFixed(6) + ' BTC';
    }
    if (converted < 1) {
      return `${cur.symbol}${converted.toFixed(4)}`;
    }
    return `${cur.symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  // --- Toast Notification Helper (Disabled per user request) ---
  function showToast(message, type = 'info') {
    // Notifications disabled across the website
  }

  // --- Real-Time API Data Fetching ---
  async function fetchLiveMarketData() {
    STATE.isSyncing = true;
    const syncBtn = document.getElementById('btnManualRefresh');
    if (syncBtn) syncBtn.classList.add('spinning');

    const marketPill = document.getElementById('marketStatusPill');
    const marketStatusText = document.getElementById('marketStatusText');
    if (marketStatusText) marketStatusText.textContent = 'Synchronizing...';

    let fetchedData = null;

    try {
      // 1. Attempt CoinGecko Markets API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const endpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h';
      const response = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const json = await response.json();
        if (Array.isArray(json) && json.length > 0) {
          fetchedData = json;
          console.log('[Apex Wealth] Successfully retrieved live CoinGecko data feed.');
        }
      }
    } catch (err) {
      console.warn('[Apex Wealth] Live CoinGecko endpoint unreachable or rate-limited. Falling back to institutional backup stream.', err.message);
    }

    // 2. If CoinGecko is throttled, attempt Coinbase Spot for Bitcoin
    if (!fetchedData) {
      try {
        const cbRes = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
        if (cbRes.ok) {
          const cbData = await cbRes.json();
          const btcPrice = parseFloat(cbData?.data?.amount);
          if (btcPrice > 0) {
            DEFAULT_COIN_DATA[0].current_price = btcPrice;
            DEFAULT_COIN_DATA[0].high_24h = btcPrice * 1.018;
            DEFAULT_COIN_DATA[0].low_24h = btcPrice * 0.985;
            console.log('[Apex Wealth] Coinbase live BTC spot synchronized:', btcPrice);
          }
        }
      } catch (cbErr) {
        // Continue with local high-fidelity simulated feed
      }
      fetchedData = DEFAULT_COIN_DATA;
    }

    STATE.marketCoins = fetchedData;
    updateDashboardWithMarketData();

    STATE.isSyncing = false;
    if (syncBtn) syncBtn.classList.remove('spinning');
    if (marketStatusText) marketStatusText.textContent = 'Live Feed Connected';

    const timestampEl = document.getElementById('tickerSyncTimestamp');
    if (timestampEl) {
      const now = new Date();
      timestampEl.textContent = `Synced: ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    }
  }

  // --- Dynamic Dashboard Updates ---
  function updateDashboardWithMarketData() {
    const btcData = STATE.marketCoins.find(c => c.id === 'bitcoin' || c.symbol?.toLowerCase() === 'btc') || DEFAULT_COIN_DATA[0];

    // Update BTC Spotlight Card
    const spotPriceEl = document.getElementById('btcSpotPrice');
    const btcBadge = document.getElementById('btc24hBadge');
    const btcHighEl = document.getElementById('btc24hHigh');
    const btcLowEl = document.getElementById('btc24hLow');
    const btcVolEl = document.getElementById('btcVolume');

    if (spotPriceEl) {
      spotPriceEl.textContent = formatPreciseCurrency(btcData.current_price);
    }
    if (btcBadge) {
      const change = btcData.price_change_percentage_24h || 1.34;
      const isUp = change >= 0;
      btcBadge.className = `pnl-badge ${isUp ? 'positive' : 'negative'}`;
      btcBadge.innerHTML = `<span>${isUp ? '▲' : '▼'}</span> ${isUp ? '+' : ''}${change.toFixed(2)}%`;
    }
    if (btcHighEl) btcHighEl.textContent = formatPreciseCurrency(btcData.high_24h || btcData.current_price * 1.015);
    if (btcLowEl) btcLowEl.textContent = formatPreciseCurrency(btcData.low_24h || btcData.current_price * 0.985);
    if (btcVolEl) btcVolEl.textContent = formatMoney(btcData.total_volume || 32000000000);

    // Update Pablo Rindt's Bitcoin Holding Display
    const pabloHolding = STATE.holdings.find(h => h.id === 'bitcoin');
    if (pabloHolding) {
      pabloHolding.currentPrice = btcData.current_price;
      const btcUnitsEl = document.getElementById('pabloBtcUnits');
      const btcValEl = document.getElementById('pabloBtcVal');
      if (btcUnitsEl) btcUnitsEl.textContent = `${pabloHolding.quantity.toFixed(5)} BTC`;
      if (btcValEl) btcValEl.textContent = formatMoney(pabloHolding.baseTargetVal);
    }

    // Refresh Dynamic Tables & Tickers
    renderMarketTable();
    renderQuickTickers();
    renderHoldingsTable();
    updatePortfolioOverviewMetrics();
  }

  // --- Portfolio Valuation Sync (Total: $128,856.00) ---
  function updatePortfolioOverviewMetrics() {
    const totalEl = document.getElementById('totalBalanceVal');
    const initialEl = document.getElementById('initialDepositVal');
    const profitEl = document.getElementById('totalProfitVal');
    const cashEl = document.getElementById('cashReserveVal');
    const cryptoEl = document.getElementById('cryptoAssetsVal');
    const hero24hPnl = document.getElementById('hero24hPnl');
    const heroTotalRoi = document.getElementById('heroTotalRoi');
    const heroInitialDeposit = document.getElementById('heroInitialDeposit');

    if (totalEl) totalEl.textContent = formatMoney(STATE.currentBalance);
    if (initialEl) initialEl.textContent = formatMoney(STATE.initialDeposit);
    if (profitEl) profitEl.textContent = `+${formatMoney(STATE.totalProfit)}`;
    if (cashEl) cashEl.textContent = formatMoney(STATE.cashReserve);
    if (cryptoEl) cryptoEl.textContent = formatMoney(STATE.cryptoValue);

    if (heroTotalRoi) {
      heroTotalRoi.innerHTML = `<span>▲</span> Net Profit: <strong style="color: #34d399; margin-left: 3px;">+${formatMoney(STATE.totalProfit)} (+${STATE.roiPercent.toFixed(2)}%)</strong>`;
    }

    if (heroInitialDeposit) {
      heroInitialDeposit.innerHTML = `Initial Deposit: <strong style="color: #e2e8f0; margin-left: 3px;">${formatMoney(STATE.initialDeposit)}</strong>`;
    }

    if (hero24hPnl) {
      const sign = STATE.todayPnl >= 0 ? '+' : '';
      hero24hPnl.className = `pnl-badge ${STATE.todayPnl >= 0 ? 'positive' : 'negative'}`;
      hero24hPnl.innerHTML = `<span>${STATE.todayPnl >= 0 ? '▲' : '▼'}</span> ${sign}${formatMoney(STATE.todayPnl)} (${sign}${STATE.todayPnlPercent.toFixed(2)}%) <small style="opacity:0.8;margin-left:2px;">Today</small>`;
    }

    // Update allocation items
    const allocBtc = document.getElementById('allocValBtc');
    const allocEth = document.getElementById('allocValEth');
    const allocSol = document.getElementById('allocValSol');
    const allocUsdt = document.getElementById('allocValUsdt');
    const allocAlt = document.getElementById('allocValAlt');

    const allocs = STATE.allocations || {
      btc: 67005.12,
      eth: 32214.00,
      sol: 15462.72,
      usdt: 9019.92,
      alt: 5154.24
    };

    if (allocBtc) allocBtc.textContent = formatMoney(allocs.btc);
    if (allocEth) allocEth.textContent = formatMoney(allocs.eth);
    if (allocSol) allocSol.textContent = formatMoney(allocs.sol);
    if (allocUsdt) allocUsdt.textContent = formatMoney(allocs.usdt);
    if (allocAlt) allocAlt.textContent = formatMoney(allocs.alt);

    // Update BTC Spotlight Card
    const btcUnitsEl = document.getElementById('pabloBtcUnits');
    const btcValEl = document.getElementById('pabloBtcVal');
    const btcLabelEl = document.getElementById('userBtcHoldingLabel');
    if (btcUnitsEl && STATE.btcUnits) btcUnitsEl.textContent = STATE.btcUnits;
    if (btcValEl && STATE.btcVal) btcValEl.textContent = formatMoney(STATE.btcVal);
    if (btcLabelEl && STATE.btcLabel) btcLabelEl.textContent = STATE.btcLabel;
  }

  // --- SVG Sparkline Generator ---
  function generateSparklineSvg(prices, isPositive) {
    if (!prices || prices.length < 2) {
      // Create subtle generic trend line
      prices = isPositive ? [10, 11, 11.5, 12, 11.8, 12.5, 13] : [13, 12.5, 12, 12.2, 11.5, 11, 10.5];
    }
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = (max - min) || 1;
    const width = 120;
    const height = 32;
    const padY = 4;

    const points = prices.map((val, idx) => {
      const x = (idx / (prices.length - 1)) * width;
      const y = height - padY - ((val - min) / range) * (height - padY * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    const strokeColor = isPositive ? '#10b981' : '#f43f5e';
    return `
      <svg class="sparkline-svg" viewBox="0 0 ${width} ${height}">
        <polyline
          fill="none"
          stroke="${strokeColor}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          points="${points}"
        />
      </svg>
    `;
  }

  // --- Render Cryptocurrency Live Market Table ---
  function renderMarketTable() {
    const tbody = document.getElementById('cryptoTableBody');
    if (!tbody) return;

    let coins = [...STATE.marketCoins];

    // Search filter
    if (STATE.searchQuery.trim()) {
      const q = STATE.searchQuery.toLowerCase().trim();
      coins = coins.filter(c =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.symbol && c.symbol.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (STATE.activeFilter === 'l1') {
      coins = coins.filter(c => c.category === 'l1' || ['btc', 'eth', 'sol', 'bnb', 'ada', 'avax', 'near'].includes(c.symbol?.toLowerCase()));
    } else if (STATE.activeFilter === 'defi') {
      coins = coins.filter(c => c.category === 'defi' || ['link', 'uni', 'aave', 'mkr', 'crv'].includes(c.symbol?.toLowerCase()));
    } else if (STATE.activeFilter === 'gainers') {
      coins = coins.filter(c => (c.price_change_percentage_24h || 0) > 2.0);
      coins.sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0));
    }

    if (coins.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center; padding: 2.5rem; color: var(--text-muted);">
            No cryptocurrencies matching "<strong>${STATE.searchQuery}</strong>".
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = coins.map((coin, index) => {
      const change24h = coin.price_change_percentage_24h || 0;
      const isUp = change24h >= 0;
      const sparklinePrices = coin.sparkline_in_7d?.price || [];
      const sparklineSvg = generateSparklineSvg(sparklinePrices, isUp);
      const symbolUpper = (coin.symbol || '').toUpperCase();
      const coinImg = coin.image || 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png';

      const high = coin.high_24h || (coin.current_price * 1.02);
      const low = coin.low_24h || (coin.current_price * 0.98);
      const volume = coin.total_volume || (coin.current_price * 125000);
      const mcap = coin.market_cap || (coin.current_price * 12500000);

      return `
        <tr data-coin-id="${coin.id}">
          <td class="col-rank crypto-rank">${index + 1}</td>
          <td class="col-asset">
            <div class="coin-cell">
              <img src="${coinImg}" alt="${coin.name}" class="coin-icon" style="width: 20px; height: 20px; max-width: 20px; max-height: 20px; border-radius: 50%; object-fit: contain; flex-shrink: 0;" onerror="this.src='https://cdn-icons-png.flaticon.com/512/217/217853.png'">
              <div>
                <span class="coin-name">${coin.name}</span>
                <span class="coin-symbol">${symbolUpper}</span>
              </div>
            </div>
          </td>
          <td class="col-price mono-cell font-bold" id="price-cell-${coin.id}">
            ${formatPreciseCurrency(coin.current_price)}
          </td>
          <td class="col-change">
            <span class="change-pill-cell ${isUp ? 'up' : 'down'}">
              ${isUp ? '+' : ''}${change24h.toFixed(2)}%
            </span>
          </td>
          <td class="col-range mono-cell" style="font-size: 0.78rem;">
            <div>H: ${formatPreciseCurrency(high)}</div>
            <div style="color: var(--text-muted);">L: ${formatPreciseCurrency(low)}</div>
          </td>
          <td class="col-volume mono-cell">${formatMoney(volume)}</td>
          <td class="col-mcap mono-cell">${formatMoney(mcap)}</td>
          <td class="col-sparkline">${sparklineSvg}</td>
          <td class="col-action" style="text-align: right;">
            <button class="trade-btn-sm" onclick="window.ApexApp.openQuickTrade('${coin.id}', '${symbolUpper}')">
              Trade
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // --- Render Top Movers Quick Tickers ---
  function renderQuickTickers() {
    const grid = document.getElementById('quickTickersGrid');
    if (!grid) return;

    const moverSymbols = ['eth', 'sol', 'bnb', 'xrp'];
    const movers = STATE.marketCoins.filter(c => moverSymbols.includes(c.symbol?.toLowerCase())).slice(0, 4);

    if (movers.length === 0) return;

    grid.innerHTML = movers.map(coin => {
      const change = coin.price_change_percentage_24h || 0;
      const isUp = change >= 0;
      return `
        <div class="ticker-mini-card" onclick="window.ApexApp.openQuickTrade('${coin.id}', '${coin.symbol.toUpperCase()}')" style="cursor: pointer;" title="Trade ${coin.name}">
          <div class="ticker-card-top">
            <div class="ticker-coin-id">
              <img src="${coin.image}" style="width: 18px; height: 18px; max-width: 18px; max-height: 18px; border-radius: 50%; object-fit: contain; flex-shrink: 0;" alt="${coin.symbol}">
              <span class="ticker-symbol-text">${coin.name}</span>
            </div>
            <span class="ticker-change" style="color: ${isUp ? '#34d399' : '#f43f5e'};">
              ${isUp ? '+' : ''}${change.toFixed(2)}%
            </span>
          </div>
          <div class="ticker-price">${formatPreciseCurrency(coin.current_price)}</div>
        </div>
      `;
    }).join('');
  }

  // --- Render Pablo Rindt's Holdings Breakdown ---
  function renderHoldingsTable() {
    const tbody = document.getElementById('holdingsTableBody');
    if (!tbody) return;

    tbody.innerHTML = STATE.holdings.map(h => {
      const currentCoin = STATE.marketCoins.find(c => c.id === h.id || c.symbol?.toLowerCase() === h.symbol.toLowerCase());
      const currentPrice = currentCoin ? currentCoin.current_price : h.currentPrice;

      // Calculate realistic holding values
      const currentVal = h.baseTargetVal;
      const costBasis = h.quantity * h.avgBuyPrice;
      const pnlDollars = currentVal - costBasis;
      const pnlPercent = costBasis > 0 ? ((pnlDollars / costBasis) * 100) : 0;
      const isPositive = pnlDollars >= 0;

      return `
        <tr>
          <td class="col-holding-asset">
            <div class="coin-cell">
              <div class="user-avatar" style="width: 20px; height: 20px; min-width: 20px; min-height: 20px; font-size: 0.65rem; line-height: 20px; background: ${h.color}; color: #000; font-weight: bold; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                ${h.icon}
              </div>
              <div>
                <span class="coin-name">${h.name}</span>
                <span class="coin-symbol">${h.symbol}</span>
              </div>
            </div>
          </td>
          <td class="col-holding-qty mono-cell">
            ${h.quantity >= 1000 ? h.quantity.toLocaleString() : h.quantity.toFixed(4)} ${h.symbol}
          </td>
          <td class="col-holding-avg mono-cell">
            ${formatPreciseCurrency(h.avgBuyPrice)}
          </td>
          <td class="col-holding-val mono-cell font-bold" style="color: #fff;">
            ${formatMoney(currentVal)}
          </td>
          <td class="col-holding-pnl">
            <span class="change-pill-cell ${isPositive ? 'up' : 'down'}">
              ${isPositive ? '+' : ''}${formatMoney(pnlDollars)} (${isPositive ? '+' : ''}${pnlPercent.toFixed(1)}%)
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  // --- Interactive Portfolio Growth Canvas Chart ---
  const ChartEngine = {
    canvas: null,
    ctx: null,
    points: [],
    dates: [],
    init() {
      this.canvas = document.getElementById('performanceChart');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.bindEvents();
      this.generateData(STATE.chartRange);
      this.render();

      window.addEventListener('resize', () => {
        this.render();
      });
    },

    generateData(range) {
      const base = STATE.currentBalance;
      let count = 30;
      let startVal = base * 0.886;
      this.points = [];
      this.dates = [];

      const now = new Date();

      if (range === '24H') {
        count = 24;
        startVal = base * 0.988;
        const noiseAmp = base * 0.0035;
        for (let i = 0; i < count; i++) {
          const d = new Date(now.getTime() - (count - 1 - i) * 3600 * 1000);
          this.dates.push(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          const progress = i / (count - 1);
          const noise = Math.sin(i * 0.8) * noiseAmp + (Math.random() * (noiseAmp * 0.4) - (noiseAmp * 0.2));
          const val = startVal + (base - startVal) * progress + noise;
          this.points.push(i === count - 1 ? base : val);
        }
      } else if (range === '7D') {
        count = 14;
        startVal = base * 0.958;
        const noiseAmp = base * 0.006;
        for (let i = 0; i < count; i++) {
          const d = new Date(now.getTime() - (count - 1 - i) * 12 * 3600 * 1000);
          this.dates.push(d.toLocaleDateString([], { weekday: 'short', hour: '2-digit' }));
          const progress = i / (count - 1);
          const noise = Math.sin(i * 0.9) * noiseAmp + (Math.random() * (noiseAmp * 0.3));
          const val = startVal + (base - startVal) * progress + noise;
          this.points.push(i === count - 1 ? base : val);
        }
      } else if (range === '1M') {
        count = 30;
        startVal = base * 0.886;
        const noiseAmp = base * 0.01;
        for (let i = 0; i < count; i++) {
          const d = new Date(now.getTime() - (count - 1 - i) * 24 * 3600 * 1000);
          this.dates.push(d.toLocaleDateString([], { month: 'short', day: 'numeric' }));
          const progress = i / (count - 1);
          const noise = Math.sin(i * 0.5) * noiseAmp + Math.cos(i * 0.3) * (noiseAmp * 0.4);
          const val = startVal + (base - startVal) * Math.pow(progress, 0.85) + noise;
          this.points.push(i === count - 1 ? base : val);
        }
      } else if (range === '1Y') {
        count = 12;
        startVal = Math.max(STATE.initialDeposit, base * 0.404);
        const noiseAmp = base * 0.018;
        for (let i = 0; i < count; i++) {
          const d = new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1);
          this.dates.push(d.toLocaleDateString([], { month: 'short' }));
          const progress = i / (count - 1);
          const noise = (Math.sin(i * 0.7) * noiseAmp);
          const val = startVal + (base - startVal) * Math.pow(progress, 0.9) + noise;
          this.points.push(i === count - 1 ? base : val);
        }
      } else { // ALL - Historical track from initial deposit to base
        count = 20;
        startVal = STATE.initialDeposit;
        const noiseAmp = base * 0.018;
        for (let i = 0; i < count; i++) {
          const d = new Date(2025, 0 + Math.round(i * 1.1), 14);
          this.dates.push(d.toLocaleDateString([], { month: 'short', year: '2-digit' }));
          const progress = i / (count - 1);
          const noise = (i === 0 || i === count - 1) ? 0 : Math.sin(i * 1.1) * noiseAmp;
          const val = startVal + (base - startVal) * Math.pow(progress, 1.15) + noise;
          this.points.push(i === count - 1 ? base : val);
        }
      }
    },

    render() {
      if (!this.canvas || !this.ctx) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      const width = rect.width;
      const height = rect.height;

      this.canvas.width = width * dpr;
      this.canvas.height = height * dpr;
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;

      const ctx = this.ctx;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, width, height);

      const paddingLeft = 10;
      const paddingRight = 10;
      const paddingTop = 25;
      const paddingBottom = 25;

      const plotW = width - paddingLeft - paddingRight;
      const plotH = height - paddingTop - paddingBottom;

      const min = Math.min(...this.points) * 0.98;
      const max = Math.max(...this.points) * 1.02;
      const range = (max - min) || 1;

      // Draw horizontal grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i <= 4; i++) {
        const y = paddingTop + (plotH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(width - paddingRight, y);
        ctx.stroke();
      }

      // Compute coordinate points
      const coords = this.points.map((val, i) => {
        const x = paddingLeft + (i / (this.points.length - 1)) * plotW;
        const y = paddingTop + plotH - ((val - min) / range) * plotH;
        return { x, y, val, date: this.dates[i] };
      });

      this.currentCoords = coords;

      // Draw Gradient Area under Curve
      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);
      for (let i = 0; i < coords.length - 1; i++) {
        const xc = (coords[i].x + coords[i + 1].x) / 2;
        const yc = (coords[i].y + coords[i + 1].y) / 2;
        ctx.quadraticCurveTo(coords[i].x, coords[i].y, xc, yc);
      }
      ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y);
      ctx.lineTo(width - paddingRight, height - paddingBottom);
      ctx.lineTo(paddingLeft, height - paddingBottom);
      ctx.closePath();

      const areaGrad = ctx.createLinearGradient(0, paddingTop, 0, height);
      areaGrad.addColorStop(0, 'rgba(99, 102, 241, 0.38)');
      areaGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.12)');
      areaGrad.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Draw glowing stroke line
      ctx.save();
      ctx.shadowColor = 'rgba(99, 102, 241, 0.6)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);
      for (let i = 0; i < coords.length - 1; i++) {
        const xc = (coords[i].x + coords[i + 1].x) / 2;
        const yc = (coords[i].y + coords[i + 1].y) / 2;
        ctx.quadraticCurveTo(coords[i].x, coords[i].y, xc, yc);
      }
      ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y);
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      // Highlight the last current point
      const last = coords[coords.length - 1];
      ctx.beginPath();
      ctx.arc(last.x, last.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#6366f1';
      ctx.shadowBlur = 15;
      ctx.fill();
    },

    bindEvents() {
      const container = document.getElementById('chartContainer');
      const tooltip = document.getElementById('chartTooltip');
      const tooltipDate = document.getElementById('tooltipDate');
      const tooltipVal = document.getElementById('tooltipVal');
      if (!container || !tooltip) return;

      const handlePointerMove = (clientX) => {
        if (!this.currentCoords || this.currentCoords.length === 0) return;
        const rect = container.getBoundingClientRect();
        const mouseX = clientX - rect.left;

        // Find nearest point
        let nearest = this.currentCoords[0];
        let minDist = Infinity;
        for (const pt of this.currentCoords) {
          const dist = Math.abs(pt.x - mouseX);
          if (dist < minDist) {
            minDist = dist;
            nearest = pt;
          }
        }

        tooltip.style.opacity = '1';
        tooltip.style.left = `${nearest.x}px`;
        tooltip.style.top = `${nearest.y - 12}px`;
        if (tooltipDate) tooltipDate.textContent = nearest.date;
        if (tooltipVal) tooltipVal.textContent = formatMoney(nearest.val);
      };

      container.addEventListener('mousemove', (e) => {
        handlePointerMove(e.clientX);
      });

      container.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
          handlePointerMove(e.touches[0].clientX);
        }
      }, { passive: true });

      container.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
          handlePointerMove(e.touches[0].clientX);
        }
      }, { passive: true });

      const hideTooltip = () => {
        tooltip.style.opacity = '0';
      };

      container.addEventListener('mouseleave', hideTooltip);
      container.addEventListener('touchend', hideTooltip);

      // Timeframe buttons
      const timeBtns = document.querySelectorAll('#timeframeSelector .time-btn');
      timeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          timeBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const range = btn.getAttribute('data-range') || '1M';
          STATE.chartRange = range;
          this.generateData(range);
          this.render();
        });
      });
    }
  };

  // --- Real-Time Micro-Ticks Simulation ---
  // Subtly animates live prices every few seconds to give active market vitality
  function startLiveMicroTicks() {
    setInterval(() => {
      if (!STATE.marketCoins || STATE.marketCoins.length === 0) return;

      // Pick a random coin to tick
      const randIndex = Math.floor(Math.random() * Math.min(6, STATE.marketCoins.length));
      const coin = STATE.marketCoins[randIndex];
      if (!coin) return;

      // +/- 0.05% to 0.18%
      const deltaPercent = (Math.random() * 0.25 - 0.12) / 100;
      const oldPrice = coin.current_price;
      const newPrice = oldPrice * (1 + deltaPercent);
      coin.current_price = newPrice;
      if (newPrice > (coin.high_24h || 0)) coin.high_24h = newPrice;
      if (newPrice < (coin.low_24h || Infinity)) coin.low_24h = newPrice;

      const isTickUp = newPrice >= oldPrice;

      // If Bitcoin ticked, flash the main spotlight
      if (coin.id === 'bitcoin' || coin.symbol?.toLowerCase() === 'btc') {
        const spotPriceEl = document.getElementById('btcSpotPrice');
        if (spotPriceEl) {
          spotPriceEl.textContent = formatPreciseCurrency(newPrice);
          spotPriceEl.classList.remove('flash-up', 'flash-down');
          void spotPriceEl.offsetWidth;
          spotPriceEl.classList.add(isTickUp ? 'flash-up' : 'flash-down');
        }
      }

      // Flash table price cell
      const cell = document.getElementById(`price-cell-${coin.id}`);
      if (cell) {
        cell.textContent = formatPreciseCurrency(newPrice);
        cell.classList.remove('flash-up', 'flash-down');
        void cell.offsetWidth;
        cell.classList.add(isTickUp ? 'flash-up' : 'flash-down');
      }
    }, 3200);
  }

  // --- Auto-Sync Countdown Timer ---
  function startAutoSyncTimer() {
    setInterval(() => {
      STATE.countdown--;
      const countdownEl = document.getElementById('autoRefreshCountdown');
      if (countdownEl) {
        countdownEl.textContent = `Auto-sync in ${STATE.countdown}s`;
      }

      if (STATE.countdown <= 0) {
        STATE.countdown = 30;
        fetchLiveMarketData();
      }
    }, 1000);
  }

  // --- Interactive Modals & Actions ---
  function initModalsAndButtons() {
    // Open Modal Triggers
    const btnDeposit = document.getElementById('btnOpenDeposit');
    const btnWithdraw = document.getElementById('btnOpenWithdraw');
    const btnSwap = document.getElementById('btnOpenSwap');
    const btnExport = document.getElementById('btnExportPdf');

    const depositModal = document.getElementById('depositModal');
    const withdrawModal = document.getElementById('withdrawModal');
    const swapModal = document.getElementById('swapModal');

    function openModal(modal) {
      if (modal) modal.classList.add('open');
    }
    function closeModal(modal) {
      if (modal) modal.classList.remove('open');
    }

    if (btnDeposit) btnDeposit.addEventListener('click', () => openModal(depositModal));
    if (btnWithdraw) btnWithdraw.addEventListener('click', () => {
      openModal(withdrawModal);
    });
    if (btnSwap) btnSwap.addEventListener('click', () => openModal(swapModal));

    // Close buttons via data attribute
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-close-modal');
        const modal = document.getElementById(id);
        closeModal(modal);
      });
    });

    // Close on overlay backdrop click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay);
      });
    });

    // Copy Deposit Addresses: Tier 1 ($10 - $15,000) & Tier 2 ($16,000+)
    const DEPOSIT_BTC_ADDRESS_TIER1 = "1MjkApYA1gRcUeu8RY8vsXLr8EQx4oKLdV";
    const DEPOSIT_BTC_ADDRESS_TIER2 = "bc1qqk30wwhkp85etumtcak8ujzfjdekye9rkkm7wz";

    function copyAddressText(address, labelId) {
      const labelEl = document.getElementById(labelId);
      const updateLabelSuccess = () => {
        if (labelEl) {
          const originalText = labelEl.textContent;
          labelEl.textContent = 'Copied! ✔';
          setTimeout(() => {
            labelEl.textContent = originalText;
          }, 2500);
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(() => {
          updateLabelSuccess();
        }).catch(() => {
          updateLabelSuccess();
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = address;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          updateLabelSuccess();
        } catch (e) { }
        document.body.removeChild(ta);
      }
    }

    const btnCopyTier1 = document.getElementById('btnCopyTier1');
    const btnCopyTier2 = document.getElementById('btnCopyTier2');
    if (btnCopyTier1) {
      btnCopyTier1.addEventListener('click', () => copyAddressText(DEPOSIT_BTC_ADDRESS_TIER1, 'copyBtnLabelTier1'));
    }
    if (btnCopyTier2) {
      btnCopyTier2.addEventListener('click', () => copyAddressText(DEPOSIT_BTC_ADDRESS_TIER2, 'copyBtnLabelTier2'));
    }

    // Swap / Quick Trade execution
    const btnConfirmSwap = document.getElementById('btnConfirmSwap');
    const swapPayInput = document.getElementById('swapPayInput');
    const swapTargetAsset = document.getElementById('swapTargetAsset');
    const swapEstimatedUnits = document.getElementById('swapEstimatedUnits');

    function updateSwapEstimate() {
      if (!swapPayInput || !swapTargetAsset || !swapEstimatedUnits) return;
      const payAmt = parseFloat(swapPayInput.value) || 0;
      const coinId = swapTargetAsset.value;
      const coin = STATE.marketCoins.find(c => c.id === coinId) || DEFAULT_COIN_DATA[0];
      const coinPrice = coin ? coin.current_price : 76560;
      const units = payAmt / coinPrice;
      swapEstimatedUnits.textContent = `${units.toFixed(5)} ${(coin.symbol || '').toUpperCase()}`;
    }

    if (swapPayInput) swapPayInput.addEventListener('input', updateSwapEstimate);
    if (swapTargetAsset) swapTargetAsset.addEventListener('change', updateSwapEstimate);

    if (btnConfirmSwap) {
      btnConfirmSwap.addEventListener('click', () => {
        const payAmt = parseFloat(swapPayInput.value) || 0;
        const coinId = swapTargetAsset.value;
        const coin = STATE.marketCoins.find(c => c.id === coinId) || DEFAULT_COIN_DATA[0];

        if (payAmt <= 0) {
          return;
        }

        const symbol = (coin.symbol || 'BTC').toUpperCase();
        logActivity(`Institutional Swap (USD → ${symbol})`, `-${formatMoney(payAmt)} USD`, 'trade', 'Filled');
        closeModal(swapModal);
      });
    }

    // Statement Export
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        setTimeout(() => {
          window.print();
        }, 300);
      });
    }

    // Manual Refresh Button
    const btnRefresh = document.getElementById('btnManualRefresh');
    if (btnRefresh) {
      btnRefresh.addEventListener('click', () => {
        STATE.countdown = 30;
        fetchLiveMarketData();
      });
    }

    // Currency Selector Toggle
    const currencyBtn = document.getElementById('currencyToggleBtn');
    if (currencyBtn) {
      currencyBtn.addEventListener('click', () => {
        STATE.currentCurrencyIndex = (STATE.currentCurrencyIndex + 1) % STATE.currencies.length;
        const cur = STATE.currencies[STATE.currentCurrencyIndex];
        currencyBtn.innerHTML = `<span>🌐</span> ${cur.code} (${cur.symbol})`;
        updateDashboardWithMarketData();
        ChartEngine.render();
      });
    }

    // Privacy Mask Toggle
    const privacyBtn = document.getElementById('privacyBtn');
    const heroEyeToggle = document.getElementById('heroEyeToggle');

    function togglePrivacy() {
      STATE.privacyActive = !STATE.privacyActive;
      document.body.classList.toggle('privacy-masked', STATE.privacyActive);

      const privacyIcon = document.getElementById('privacyIcon');
      const privacyLabel = document.getElementById('privacyLabel');
      if (privacyIcon) privacyIcon.textContent = STATE.privacyActive ? '🔒' : '👁️';
      if (privacyLabel) privacyLabel.textContent = STATE.privacyActive ? 'Masked' : 'Privacy';
    }

    if (privacyBtn) privacyBtn.addEventListener('click', togglePrivacy);
    if (heroEyeToggle) heroEyeToggle.addEventListener('click', togglePrivacy);

    // Search input
    const searchInput = document.getElementById('marketSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        STATE.searchQuery = e.target.value;
        renderMarketTable();
      });
    }

    // Category Filter Pills
    const filterPills = document.querySelectorAll('#categoryFilterPills .filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        STATE.activeFilter = pill.getAttribute('data-filter') || 'all';
        renderMarketTable();
      });
    });
  }

  // --- Dynamic Activity Feed Logger ---
  function logActivity(title, amountStr, type, status) {
    const list = document.getElementById('activityList');
    if (!list) return;

    const icons = {
      deposit: '📥',
      trade: '🔄',
      yield: '⚡'
    };

    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="activity-left">
        <div class="activity-icon-wrap ${type}">${icons[type] || '⚡'}</div>
        <div class="activity-info">
          <h4>${title}</h4>
          <span class="activity-date">Just now • Automated Audit</span>
        </div>
      </div>
      <div class="activity-right">
        <div class="activity-amount" style="color: ${amountStr.startsWith('+') ? '#34d399' : '#fff'};">${amountStr}</div>
        <span class="activity-status-badge">${status}</span>
      </div>
    `;

    list.insertBefore(item, list.firstChild);
  }

  // --- Dynamic Profile Application Engine ---
  function applyUserProfile(profile) {
    if (!profile) return;
    STATE.currentUserProfile = profile;
    STATE.user = {
      name: profile.name,
      tier: profile.tier,
      id: profile.id
    };
    STATE.currencies = profile.currencies;
    STATE.currentCurrencyIndex = 0;
    STATE.baseBalance = profile.baseBalance;
    STATE.currentBalance = profile.baseBalance;
    STATE.initialDeposit = profile.initialDeposit;
    STATE.totalProfit = profile.totalProfit;
    STATE.roiPercent = profile.roiPercent;
    STATE.cashReserve = profile.cashReserve;
    STATE.cryptoValue = profile.cryptoValue;
    STATE.todayPnl = profile.todayPnl;
    STATE.todayPnlPercent = profile.todayPnlPercent;
    STATE.holdings = profile.holdings;
    STATE.allocations = profile.allocations;
    STATE.btcUnits = profile.btcUnits;
    STATE.btcVal = profile.btcVal;
    STATE.btcLabel = profile.btcLabel;

    // Update document title & metadata
    document.title = profile.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', profile.pageDescription);

    // Update Header
    const userNameEl = document.getElementById('userNameDisplay');
    if (userNameEl) userNameEl.textContent = `${profile.name} 🛡️`;

    const userAvatarEl = document.getElementById('userAvatar');
    if (userAvatarEl) userAvatarEl.textContent = profile.initials;

    const userTierEl = document.getElementById('userTierDisplay');
    if (userTierEl) userTierEl.innerHTML = `<span>★</span> ${profile.tier}`;

    const curBtn = document.getElementById('currencyToggleBtn');
    if (curBtn) curBtn.innerHTML = `<span>🌐</span> ${profile.currencies[0].code} (${profile.currencies[0].symbol})`;

    // Update Spotlight & Subtitles
    const chartGrowthSub = document.getElementById('chartSubtitleGrowth');
    if (chartGrowthSub) chartGrowthSub.textContent = profile.chartGrowthSubtitle;

    const allocSub = document.getElementById('allocationSubtitle');
    if (allocSub) allocSub.textContent = profile.allocationSubtitle;

    const holdingsTitleEl = document.getElementById('holdingsCardTitle');
    if (holdingsTitleEl) holdingsTitleEl.textContent = profile.holdingsTitle;

    const holdingsSubEl = document.getElementById('holdingsCardSubtitle');
    if (holdingsSubEl) holdingsSubEl.textContent = profile.holdingsSubtitle;

    const footerNameEl = document.getElementById('footerClientName');
    if (footerNameEl) footerNameEl.textContent = profile.footerClient;

    // Update Modals
    const depositAvatarEl = document.getElementById('depositAvatar');
    if (depositAvatarEl) depositAvatarEl.textContent = profile.initials;

    const depositUserEl = document.getElementById('depositUserName');
    if (depositUserEl) depositUserEl.textContent = profile.depositUser;

    const depositTierEl = document.getElementById('depositUserTier');
    if (depositTierEl) depositTierEl.textContent = profile.depositTier;

    const depositPill1 = document.getElementById('depositTierRangePill1');
    if (depositPill1) depositPill1.textContent = profile.depositRangePill1;

    const depositPill2 = document.getElementById('depositTierRangePill2');
    if (depositPill2) depositPill2.textContent = profile.depositRangePill2;

    const depositNoteEl = document.getElementById('depositRoutingNote');
    if (depositNoteEl) depositNoteEl.innerHTML = profile.depositRouting;

    const withdrawBenEl = document.getElementById('withdrawBeneficiary');
    if (withdrawBenEl) withdrawBenEl.textContent = profile.withdrawBeneficiary;

    const withdrawLockedEl = document.getElementById('withdrawLockedCapital');
    if (withdrawLockedEl) withdrawLockedEl.textContent = profile.withdrawLocked;

    const withdrawExpEl = document.getElementById('withdrawLockExpiry');
    if (withdrawExpEl) withdrawExpEl.textContent = profile.withdrawExpiry;

    const withdrawTitleEl = document.getElementById('withdrawBannerTitle');
    if (withdrawTitleEl) withdrawTitleEl.textContent = profile.withdrawBannerTitle;

    const withdrawTextEl = document.getElementById('withdrawBannerText');
    if (withdrawTextEl) withdrawTextEl.innerHTML = profile.withdrawBannerText;

    // Re-render dashboard overview & tables
    updateDashboardWithMarketData();

    if (ChartEngine.canvas) {
      ChartEngine.generateData(STATE.chartRange);
      ChartEngine.render();
    }
  }

  // --- Client Authentication & Security Engine ---
  const AuthEngine = {
    init() {
      const authScreen = document.getElementById('authScreen');
      const dashboardApp = document.getElementById('dashboardApp');
      const loginForm = document.getElementById('loginForm');
      const usernameInput = document.getElementById('loginUsername');
      const passwordInput = document.getElementById('loginPassword');
      const usernameWrapper = document.getElementById('usernameInputWrapper');
      const passwordWrapper = document.getElementById('passwordInputWrapper');
      const usernameReqPill = document.getElementById('usernameReqPill');
      const passwordReqPill = document.getElementById('passwordReqPill');
      const errorBanner = document.getElementById('authErrorBanner');
      const errorMessage = document.getElementById('authErrorMessage');
      const submitBtn = document.getElementById('btnAuthSubmit');
      const btnSpinner = document.getElementById('authBtnSpinner');
      const btnIcon = document.getElementById('authBtnIcon');
      const btnText = document.getElementById('authBtnText');
      const togglePwdBtn = document.getElementById('btnTogglePassword');
      const logoutBtn = document.getElementById('logoutBtn');

      function showError(msg) {
        if (!errorBanner || !errorMessage) return;
        errorMessage.textContent = msg;
        errorBanner.style.display = 'flex';
        errorBanner.classList.remove('auth-shake');
        void errorBanner.offsetWidth; // Trigger reflow for animation
        errorBanner.classList.add('auth-shake');
      }

      function hideError() {
        if (errorBanner) errorBanner.style.display = 'none';
        if (usernameWrapper) usernameWrapper.classList.remove('input-error');
        if (passwordWrapper) passwordWrapper.classList.remove('input-error');
      }

      function updateUsernamePill() {
        if (!usernameInput || !usernameReqPill) return;
        const val = usernameInput.value.trim();
        if (val.length >= 8) {
          usernameReqPill.className = 'auth-req-pill valid';
          usernameReqPill.textContent = '✓ ' + val.length + ' chars';
          if (usernameWrapper) usernameWrapper.classList.add('input-valid');
        } else if (val.length > 0) {
          usernameReqPill.className = 'auth-req-pill invalid';
          usernameReqPill.textContent = val.length + '/8 chars';
          if (usernameWrapper) usernameWrapper.classList.remove('input-valid');
        } else {
          usernameReqPill.className = 'auth-req-pill';
          usernameReqPill.textContent = 'Min 8 chars';
          if (usernameWrapper) usernameWrapper.classList.remove('input-valid');
        }
      }

      function updatePasswordPill() {
        if (!passwordInput || !passwordReqPill) return;
        const val = passwordInput.value;
        if (val.length >= 8) {
          passwordReqPill.className = 'auth-req-pill valid';
          passwordReqPill.textContent = '✓ ' + val.length + ' chars';
          if (passwordWrapper) passwordWrapper.classList.add('input-valid');
        } else if (val.length > 0) {
          passwordReqPill.className = 'auth-req-pill invalid';
          passwordReqPill.textContent = val.length + '/8 chars';
          if (passwordWrapper) passwordWrapper.classList.remove('input-valid');
        } else {
          passwordReqPill.className = 'auth-req-pill';
          passwordReqPill.textContent = 'Min 8 chars';
          if (passwordWrapper) passwordWrapper.classList.remove('input-valid');
        }
      }

      if (usernameInput) {
        usernameInput.addEventListener('input', () => {
          hideError();
          updateUsernamePill();
        });
      }

      if (passwordInput) {
        passwordInput.addEventListener('input', () => {
          hideError();
          updatePasswordPill();
        });
      }

      if (togglePwdBtn && passwordInput) {
        togglePwdBtn.addEventListener('click', () => {
          const isPwd = passwordInput.getAttribute('type') === 'password';
          passwordInput.setAttribute('type', isPwd ? 'text' : 'password');
          const eyeSvg = document.getElementById('pwdEyeSvg');
          if (eyeSvg) {
            eyeSvg.innerHTML = isPwd
              ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`
              : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
          }
        });
      }


      function authenticate(username, password) {
        const u = (username || '').trim();
        const p = password || '';

        // Validation 1: Username min 8 chars
        if (u.length < 8) {
          if (usernameWrapper) usernameWrapper.classList.add('input-error');
          showError('Username must be at least 8 characters long.');
          return false;
        }

        // Validation 2: Password min 8 chars
        if (p.length < 8) {
          if (passwordWrapper) passwordWrapper.classList.add('input-error');
          showError('Password must be at least 8 characters long.');
          return false;
        }

        // Validation 3: Match registered institutional credentials
        const profile = Object.values(USER_PROFILES).find(prof => prof.username === u && prof.password === p);

        if (!profile) {
          if (usernameWrapper) usernameWrapper.classList.add('input-error');
          if (passwordWrapper) passwordWrapper.classList.add('input-error');
          showError('Invalid credentials. Please verify your client username and institutional passkey.');
          return false;
        }

        // Successful authentication
        if (submitBtn) submitBtn.disabled = true;
        if (btnSpinner) btnSpinner.style.display = 'inline-block';
        if (btnIcon) btnIcon.style.display = 'none';
        if (btnText) btnText.textContent = 'Unlocking Vault...';

        setTimeout(() => {
          sessionStorage.setItem('apex_auth_user', profile.username);
          applyUserProfile(profile);

          if (authScreen) authScreen.style.display = 'none';
          if (dashboardApp) {
            dashboardApp.style.display = 'flex';
          }

          if (submitBtn) submitBtn.disabled = false;
          if (btnSpinner) btnSpinner.style.display = 'none';
          if (btnIcon) btnIcon.style.display = 'inline-block';
          if (btnText) btnText.textContent = 'Unlock Custody Vault';

          // Render chart cleanly in visible view
          setTimeout(() => {
            if (ChartEngine.canvas) {
              ChartEngine.render();
            }
          }, 60);
        }, 350);

        return true;
      }

      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          authenticate(usernameInput ? usernameInput.value : '', passwordInput ? passwordInput.value : '');
        });
      }

      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          sessionStorage.removeItem('apex_auth_user');
          if (dashboardApp) dashboardApp.style.display = 'none';
          if (authScreen) authScreen.style.display = 'flex';
          if (loginForm) loginForm.reset();
          hideError();
          updateUsernamePill();
          updatePasswordPill();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      // Check existing authenticated session
      const savedUser = sessionStorage.getItem('apex_auth_user');
      if (savedUser && USER_PROFILES[savedUser]) {
        applyUserProfile(USER_PROFILES[savedUser]);
        if (authScreen) authScreen.style.display = 'none';
        if (dashboardApp) dashboardApp.style.display = 'flex';
      } else {
        if (authScreen) authScreen.style.display = 'flex';
        if (dashboardApp) dashboardApp.style.display = 'none';
      }
    }
  };

  // --- Global Helper for In-Table Action Buttons ---
  window.ApexApp = {
    openQuickTrade(coinId, symbol) {
      const swapModal = document.getElementById('swapModal');
      const swapTargetAsset = document.getElementById('swapTargetAsset');
      if (swapTargetAsset) {
        // Find or create option
        let opt = Array.from(swapTargetAsset.options).find(o => o.value === coinId);
        if (!opt) {
          opt = document.createElement('option');
          opt.value = coinId;
          opt.text = `${symbol} (${coinId})`;
          swapTargetAsset.add(opt);
        }
        swapTargetAsset.value = coinId;
      }
      if (swapModal) swapModal.classList.add('open');
      const swapPayInput = document.getElementById('swapPayInput');
      if (swapPayInput) {
        swapPayInput.dispatchEvent(new Event('input'));
      }
    }
  };

  // --- Initialization on DOM Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[Apex Wealth] Initializing institutional multi-client portal...');

    // Initialize authentication engine
    AuthEngine.init();

    // Initialize chart
    ChartEngine.init();

    // Setup interactive handlers
    initModalsAndButtons();

    // Initial table render with default data before network resolution
    STATE.marketCoins = DEFAULT_COIN_DATA;
    updateDashboardWithMarketData();

    // Fetch live market data from APIs
    fetchLiveMarketData();

    // Start background sync & tick simulators
    startLiveMicroTicks();
    startAutoSyncTimer();
  });

})();

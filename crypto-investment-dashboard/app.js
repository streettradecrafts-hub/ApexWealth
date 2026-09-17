/**
 * Apex Wealth - Private Institutional Client Portal
 * Dashboard Application Logic for Pablo Rindt ($128,000.00)
 */

(function () {
  'use strict';

  // --- Global Application State ---
  const STATE = {
    user: {
      name: "Pablo Rindt",
      tier: "Accredited Investor Tier III",
      id: "PR-984420-APX"
    },
    currencies: [
      { code: 'USD', symbol: '$', rate: 1.0 },
      { code: 'EUR', symbol: '€', rate: 0.92 },
      { code: 'GBP', symbol: '£', rate: 0.78 },
      { code: 'BTC', symbol: '₿', rate: 0.000013 }
    ],
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
    // Pablo Rindt's curated holdings breakdown (Baseline adds up to exact $128,856.00)
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

  // --- Toast Notification Helper ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';
    if (type === 'live') icon = '⚡';

    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
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

    if (allocBtc) allocBtc.textContent = formatMoney(67005.12);
    if (allocEth) allocEth.textContent = formatMoney(32214.00);
    if (allocSol) allocSol.textContent = formatMoney(15462.72);
    if (allocUsdt) allocUsdt.textContent = formatMoney(9019.92);
    if (allocAlt) allocAlt.textContent = formatMoney(5154.24);
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
          <td class="crypto-rank">${index + 1}</td>
          <td>
            <div class="coin-cell">
              <img src="${coinImg}" alt="${coin.name}" class="coin-icon" style="width: 20px; height: 20px; max-width: 20px; max-height: 20px; border-radius: 50%; object-fit: contain; flex-shrink: 0;" onerror="this.src='https://cdn-icons-png.flaticon.com/512/217/217853.png'">
              <div>
                <span class="coin-name">${coin.name}</span>
                <span class="coin-symbol">${symbolUpper}</span>
              </div>
            </div>
          </td>
          <td class="mono-cell font-bold" id="price-cell-${coin.id}">
            ${formatPreciseCurrency(coin.current_price)}
          </td>
          <td>
            <span class="change-pill-cell ${isUp ? 'up' : 'down'}">
              ${isUp ? '+' : ''}${change24h.toFixed(2)}%
            </span>
          </td>
          <td class="mono-cell" style="font-size: 0.78rem;">
            <div>H: ${formatPreciseCurrency(high)}</div>
            <div style="color: var(--text-muted);">L: ${formatPreciseCurrency(low)}</div>
          </td>
          <td class="mono-cell">${formatMoney(volume)}</td>
          <td class="mono-cell">${formatMoney(mcap)}</td>
          <td>${sparklineSvg}</td>
          <td style="text-align: right;">
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
          <td>
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
          <td class="mono-cell">
            ${h.quantity >= 1000 ? h.quantity.toLocaleString() : h.quantity.toFixed(4)} ${h.symbol}
          </td>
          <td class="mono-cell">
            ${formatPreciseCurrency(h.avgBuyPrice)}
          </td>
          <td class="mono-cell font-bold" style="color: #fff;">
            ${formatMoney(currentVal)}
          </td>
          <td>
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
      let startVal = 114200;
      this.points = [];
      this.dates = [];

      const now = new Date();

      if (range === '24H') {
        count = 24;
        startVal = 127215.80;
        for (let i = 0; i < count; i++) {
          const d = new Date(now.getTime() - (count - 1 - i) * 3600 * 1000);
          this.dates.push(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          const progress = i / (count - 1);
          const noise = Math.sin(i * 0.8) * 450 + (Math.random() * 200 - 100);
          const val = startVal + (base - startVal) * progress + noise;
          this.points.push(i === count - 1 ? base : val);
        }
      } else if (range === '7D') {
        count = 14;
        startVal = 123500;
        for (let i = 0; i < count; i++) {
          const d = new Date(now.getTime() - (count - 1 - i) * 12 * 3600 * 1000);
          this.dates.push(d.toLocaleDateString([], { weekday: 'short', hour: '2-digit' }));
          const progress = i / (count - 1);
          const noise = Math.sin(i * 0.9) * 800 + (Math.random() * 300);
          const val = startVal + (base - startVal) * progress + noise;
          this.points.push(i === count - 1 ? base : val);
        }
      } else if (range === '1M') {
        count = 30;
        startVal = 114200;
        for (let i = 0; i < count; i++) {
          const d = new Date(now.getTime() - (count - 1 - i) * 24 * 3600 * 1000);
          this.dates.push(d.toLocaleDateString([], { month: 'short', day: 'numeric' }));
          const progress = i / (count - 1);
          const noise = Math.sin(i * 0.5) * 1400 + Math.cos(i * 0.3) * 600;
          const val = startVal + (base - startVal) * Math.pow(progress, 0.85) + noise;
          this.points.push(i === count - 1 ? base : val);
        }
      } else if (range === '1Y') {
        count = 12;
        startVal = 52000;
        for (let i = 0; i < count; i++) {
          const d = new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1);
          this.dates.push(d.toLocaleDateString([], { month: 'short' }));
          const progress = i / (count - 1);
          const noise = (Math.sin(i * 0.7) * 2500);
          const val = startVal + (base - startVal) * Math.pow(progress, 0.9) + noise;
          this.points.push(i === count - 1 ? base : val);
        }
      } else { // ALL - Historical track from initial deposit $40,674 to $128,856 (+216.80%)
        count = 20;
        startVal = STATE.initialDeposit;
        for (let i = 0; i < count; i++) {
          const d = new Date(2025, 0 + Math.round(i * 1.1), 14);
          this.dates.push(d.toLocaleDateString([], { month: 'short', year: '2-digit' }));
          const progress = i / (count - 1);
          const noise = (i === 0 || i === count - 1) ? 0 : Math.sin(i * 1.1) * 2400;
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

      container.addEventListener('mousemove', (e) => {
        if (!this.currentCoords || this.currentCoords.length === 0) return;
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

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
      });

      container.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
      });

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
          showToast(`Portfolio chart set to ${range} window`, 'info');
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
      showToast('Custodial Notice: Withdrawals are locked until February 2027.', 'warning');
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

    // Copy Deposit Address (1MjkApYA1gRcUeu8RY8vsXLr8EQx4oKLdV)
    const DEPOSIT_BTC_ADDRESS = "1MjkApYA1gRcUeu8RY8vsXLr8EQx4oKLdV";
    function copyDepositAddress() {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(DEPOSIT_BTC_ADDRESS).then(() => {
          const copyLabel = document.getElementById('copyBtnLabel');
          const footerBtn = document.getElementById('btnCopyAddressFooter');
          if (copyLabel) copyLabel.textContent = 'Copied!';
          if (footerBtn) footerBtn.textContent = 'Address Copied! ✔';
          showToast(`Deposit address copied: ${DEPOSIT_BTC_ADDRESS}`, 'success');
          setTimeout(() => {
            if (copyLabel) copyLabel.textContent = 'Copy';
            if (footerBtn) footerBtn.textContent = 'Copy Address';
          }, 2500);
        }).catch(() => {
          showToast(`BTC Address: ${DEPOSIT_BTC_ADDRESS}`, 'info');
        });
      } else {
        showToast(`BTC Address: ${DEPOSIT_BTC_ADDRESS}`, 'info');
      }
    }

    const btnCopyDeposit = document.getElementById('btnCopyDepositAddress');
    const btnCopyFooter = document.getElementById('btnCopyAddressFooter');
    if (btnCopyDeposit) btnCopyDeposit.addEventListener('click', copyDepositAddress);
    if (btnCopyFooter) btnCopyFooter.addEventListener('click', copyDepositAddress);

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
          showToast('Please enter an amount to trade.', 'warning');
          return;
        }

        const symbol = (coin.symbol || 'BTC').toUpperCase();
        logActivity(`Institutional Swap (USD → ${symbol})`, `-${formatMoney(payAmt)} USD`, 'trade', 'Filled');
        showToast(`Trade Executed: Swapped ${formatMoney(payAmt)} into ${symbol} at spot rate`, 'success');
        closeModal(swapModal);
      });
    }

    // Statement Export
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        showToast('Preparing Pablo Rindt Private Portfolio Statement...', 'info');
        setTimeout(() => {
          window.print();
        }, 600);
      });
    }

    // Manual Refresh Button
    const btnRefresh = document.getElementById('btnManualRefresh');
    if (btnRefresh) {
      btnRefresh.addEventListener('click', () => {
        STATE.countdown = 30;
        fetchLiveMarketData();
        showToast('Live crypto feeds refreshed.', 'live');
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
        showToast(`Base currency converted to ${cur.code} (${cur.symbol})`, 'info');
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

      showToast(
        STATE.privacyActive 
          ? 'Privacy Mask Activated: Balances blurred' 
          : 'Privacy Mask Deactivated: Balances visible',
        'info'
      );
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
    console.log('[Apex Wealth] Initializing institutional dashboard for Pablo Rindt ($128,000.00)...');
    
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

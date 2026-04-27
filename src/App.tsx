import React, { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  Mail, 
  MessageSquare, 
  Send, 
  MessageCircle, 
  Link, 
  Phone, 
  Monitor,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Percent,
  RotateCcw,
  BarChart3,
  DollarSign,
  PieChart,
  Globe,
  Grid,
  PlusCircle,
  Database,
  BookOpen
} from 'lucide-react';

const COIN_OPTIONS = [
  {value: 'Bitcoin (BTC)', icon: '₿'},
  {value: 'Ethereum (ETH)', icon: 'Ξ'},
  {value: 'Solana (SOL)', icon: '◎'},
  {value: 'Cardano (ADA)', icon: '₳'},
  {value: 'Binance Coin (BNB)', icon: 'B'}
];

const SPOT_EXCHANGES = [
  {value: 'Coinbase', icon: '©'},
  {value: 'Binance', icon: 'B'},
  {value: 'Kraken', icon: 'K'},
  {value: 'Global Average', icon: '🌐'}
];

const FUTURES_EXCHANGES = [
  {value: 'Binance Futures', icon: 'B'},
  {value: 'Bybit Futures', icon: 'B'},
  {value: 'OKX Futures', icon: 'O'}
];

const CURRENCIES = [
  {value: 'USD — Dollar', icon: '$'},
  {value: 'EUR — Euro', icon: '€'},
  {value: 'GBP — Pound', icon: '£'}
];

const TIMEFRAMES = [
  {value: '5 minutes', icon: '⏱'},
  {value: '15 minutes', icon: '⏱'},
  {value: '1 hour', icon: '⏱'},
  {value: '1 day', icon: '⏱'}
];

const INTERVALS = [
  {value: 'Every 1 hour', icon: '⏱'},
  {value: 'Every 4 hours', icon: '⏱'},
  {value: 'Every 24 hours', icon: '⏱'}
];

const VOL_TRIGGERS = [
  {value: 'Increases by', icon: '📈'},
  {value: 'Decreases by', icon: '📉'}
];

const STOCK_OPTIONS = [
  {value: 'NVIDIA (NVDA)', icon: '📈'},
  {value: 'Apple (AAPL)', icon: '🍎'},
  {value: 'Tesla (TSLA)', icon: '⚡'},
  {value: 'Microsoft (MSFT)', icon: '💻'}
];

const ASSET_OPTIONS = [
  {value: 'Bitcoin (BTC)', icon: '₿'},
  {value: 'Ethereum (ETH)', icon: 'Ξ'},
  {value: 'Total Crypto Cap', icon: '🌐'}
];

function App() {
  const [activeTab, setActiveTab] = useState('Price');
  const [direction, setDirection] = useState<'above' | 'below'>('above');
  const [notifyVia, setNotifyVia] = useState<string[]>(['Email']);
  const [cooldown, setCooldown] = useState('24h');
  const [stockAlertType, setStockAlertType] = useState('Price');

  const toggleNotify = (id: string) => {
    setNotifyVia(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  let headerContent = { title: '', desc: '', icon: <Bell className="text-white" size={24} /> };
  
  switch(activeTab) {
    case 'Price':
      headerContent = { title: 'Price Alert', desc: 'Get notified when a coin crosses your target.', icon: <Bell className="text-white" size={24} /> };
      break;
    case 'Percent':
      headerContent = { title: 'Percentage Price Alert', desc: 'Get notified when a coin changes in value by a specific percent.', icon: <Percent className="text-white" size={24} /> };
      break;
    case 'Periodic':
      headerContent = { title: 'Periodic Price Alerts', desc: 'Get notified of the price of an asset at regular intervals.', icon: <RotateCcw className="text-white" size={24} /> };
      break;
    case 'Volume':
      headerContent = { title: 'Volume Alert', desc: 'Get notified of unusual trading volume on crypto exchanges.', icon: <BarChart3 className="text-white" size={24} /> };
      break;
    case 'Funding':
      headerContent = { title: 'Funding Rates Alert', desc: 'Get notified when funding rates change on futures exchanges.', icon: <DollarSign className="text-white" size={24} /> };
      break;
    case 'Marketcap':
      headerContent = { title: 'Crypto MarketCap Alert', desc: 'Monitor the market capitalization of the entire crypto space.', icon: <PieChart className="text-white" size={24} /> };
      break;
    case 'Dominance':
      headerContent = { title: 'Bitcoin Dominance Alert', desc: 'Get notified when Bitcoin dominance crosses your target.', icon: <Globe className="text-white" size={24} /> };
      break;
    case 'Stocks':
      if (stockAlertType === 'Price') {
        headerContent = { title: 'Stock Market Alert', desc: 'Get notified when a stock price goes above or below a target.', icon: <Grid className="text-white" size={24} /> };
      } else if (stockAlertType === 'Volatility') {
        headerContent = { title: 'Stock Volatility Alert', desc: 'Get notified when a stock price changes by a specific percent.', icon: <Grid className="text-white" size={24} /> };
      } else {
        headerContent = { title: 'Periodic Stock Price Alerts', desc: 'Get notified of a stock price at regular intervals.', icon: <Grid className="text-white" size={24} /> };
      }
      break;
    default:
      headerContent = { title: `${activeTab} Alert`, desc: `Configure your ${activeTab.toLowerCase()} alert.`, icon: <Bell className="text-white" size={24} /> };
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#080808]">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/80 backdrop-blur-md border-b border-[#262626] px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex flex-col items-start cursor-pointer">
              <h1 className="text-xl font-bold tracking-widest text-white leading-none">CRYTO</h1>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#ff6b81]">ALERT</span>
                <span className="text-[7px] text-[#404040] font-medium tracking-widest uppercase ml-2">App</span>
              </div>
            </div>

            <nav className="hidden xl:flex items-center gap-8">
              <TopNavItem icon={<BarChart3 size={18} />} label="Market" />
              <TopNavItem icon={<PlusCircle size={18} />} label="Listings" />
              <TopNavItem icon={<Database size={18} />} label="On-chain" />
              <TopNavItem icon={<MessageSquare size={18} />} label="Notifications" />
              <TopNavItem icon={<BookOpen size={18} />} label="Learn" />
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <button className="btn-premium-gradient text-xs px-6 py-2.5">
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      {/* Main Content wrapper */}
      <div className="flex-grow flex flex-col pt-24 pb-32">
        <div className="flex-grow flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat bg-opacity-5">
          {/* Main Alert Card */}
          <div className="max-w-2xl w-full custom-card p-8 space-y-8 fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1a1a1a] border border-[#262626] rounded-full flex items-center justify-center">
                  {headerContent.icon}
                </div>
                <div>
                  {activeTab === 'Stocks' ? (
                    <div className="relative flex items-center gap-2 group cursor-pointer mb-1 w-fit">
                      <select 
                        value={stockAlertType}
                        onChange={(e) => setStockAlertType(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      >
                        <option value="Price">Stock Market Alert</option>
                        <option value="Volatility">Stock Volatility Alert</option>
                        <option value="Periodic">Periodic Stock Price Alerts</option>
                      </select>
                      <h1 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">{headerContent.title}</h1>
                      <ChevronDown size={18} className="text-[#737373] group-hover:text-white transition-colors" />
                    </div>
                  ) : (
                    <h1 className="text-xl font-bold">{headerContent.title}</h1>
                  )}
                  <p className="text-sm text-[#737373]">{headerContent.desc}</p>
                </div>
              </div>
              <div className="bg-[#1a1a1a] border border-[#262626] px-3 py-1.5 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
                <span className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">BTC</span>
                <span className="text-[14px] font-bold text-[#22c55e]">$78,123.05</span>
              </div>
            </div>

            {/* Dynamic Form Sections */}
            {activeTab === 'Price' && (
              <div className="space-y-4 fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Dropdown label="COIN" options={COIN_OPTIONS} />
                  <Dropdown label="EXCHANGE" options={SPOT_EXCHANGES} />
                  <Dropdown label="CURRENCY" options={CURRENCIES} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <SettingBlock label="DIRECTION">
                    <div className="grid grid-cols-2 gap-2">
                      <DirectionBtn label="Above" icon={<ArrowUp size={16} />} active={direction === 'above'} onClick={() => setDirection('above')} />
                      <DirectionBtn label="Below" icon={<ArrowDown size={16} />} active={direction === 'below'} onClick={() => setDirection('below')} />
                    </div>
                  </SettingBlock>
                  <InputBlock label="TARGET PRICE" prefix="$" placeholder="0.00" />
                </div>
              </div>
            )}

            {activeTab === 'Percent' && (
              <div className="space-y-4 fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Dropdown label="COIN" options={COIN_OPTIONS} />
                  <Dropdown label="EXCHANGE" options={SPOT_EXCHANGES} />
                  <Dropdown label="TIMEFRAME" options={TIMEFRAMES} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <SettingBlock label="DIRECTION">
                    <div className="grid grid-cols-2 gap-2">
                      <DirectionBtn label="Goes Up" icon={<ArrowUp size={16} />} active={direction === 'above'} onClick={() => setDirection('above')} />
                      <DirectionBtn label="Goes Down" icon={<ArrowDown size={16} />} active={direction === 'below'} onClick={() => setDirection('below')} />
                    </div>
                  </SettingBlock>
                  <InputBlock label="PERCENTAGE CHANGE" suffix="%" placeholder="0.00" />
                </div>
              </div>
            )}

            {activeTab === 'Periodic' && (
              <div className="space-y-4 fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Dropdown label="COIN" options={COIN_OPTIONS} />
                  <Dropdown label="EXCHANGE" options={SPOT_EXCHANGES} />
                  <Dropdown label="CURRENCY" options={CURRENCIES} />
                </div>
                <div className="pt-4 max-w-[50%]">
                  <Dropdown label="TIME INTERVAL" options={INTERVALS} />
                </div>
              </div>
            )}

            {activeTab === 'Volume' && (
              <div className="space-y-4 fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Dropdown label="COIN" options={COIN_OPTIONS} />
                  <Dropdown label="EXCHANGE" options={SPOT_EXCHANGES} />
                  <Dropdown label="TIMEFRAME" options={TIMEFRAMES} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <Dropdown label="VOLUME TRIGGER" options={VOL_TRIGGERS} />
                  <InputBlock label="MULTIPLIER" suffix="x" placeholder="5" />
                </div>
              </div>
            )}

            {activeTab === 'Funding' && (
              <div className="space-y-4 fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Dropdown label="COIN" options={COIN_OPTIONS} />
                  <Dropdown label="EXCHANGE" options={FUTURES_EXCHANGES} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <SettingBlock label="DIRECTION">
                    <div className="grid grid-cols-2 gap-2">
                      <DirectionBtn label="Above" icon={<ArrowUp size={16} />} active={direction === 'above'} onClick={() => setDirection('above')} />
                      <DirectionBtn label="Below" icon={<ArrowDown size={16} />} active={direction === 'below'} onClick={() => setDirection('below')} />
                    </div>
                  </SettingBlock>
                  <InputBlock label="TARGET PRECENTAGE" suffix="%" placeholder="0.00" />
                </div>
              </div>
            )}

            {activeTab === 'Marketcap' && (
              <div className="space-y-4 fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Dropdown label="ASSET" options={ASSET_OPTIONS} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <SettingBlock label="DIRECTION">
                    <div className="grid grid-cols-2 gap-2">
                      <DirectionBtn label="Goes Above" icon={<ArrowUp size={16} />} active={direction === 'above'} onClick={() => setDirection('above')} />
                      <DirectionBtn label="Goes Below" icon={<ArrowDown size={16} />} active={direction === 'below'} onClick={() => setDirection('below')} />
                    </div>
                  </SettingBlock>
                  <InputBlock label="TARGET VALUE" suffix="Billion USD" placeholder="100.00" />
                </div>
              </div>
            )}

            {activeTab === 'Dominance' && (
              <div className="space-y-4 fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Dropdown label="ASSET" options={ASSET_OPTIONS} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <SettingBlock label="DIRECTION">
                    <div className="grid grid-cols-2 gap-2">
                      <DirectionBtn label="Goes Above" icon={<ArrowUp size={16} />} active={direction === 'above'} onClick={() => setDirection('above')} />
                      <DirectionBtn label="Goes Below" icon={<ArrowDown size={16} />} active={direction === 'below'} onClick={() => setDirection('below')} />
                    </div>
                  </SettingBlock>
                  <InputBlock label="TARGET DOMINANCE" suffix="%" placeholder="50.00" />
                </div>
              </div>
            )}

            {activeTab === 'Stocks' && (
              <div className="space-y-4 fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Dropdown label="STOCK" options={STOCK_OPTIONS} />
                  {stockAlertType === 'Price' && <Dropdown label="CURRENCY" options={CURRENCIES} />}
                  {stockAlertType === 'Volatility' && <Dropdown label="TIMEFRAME" options={TIMEFRAMES} />}
                  {stockAlertType === 'Periodic' && <Dropdown label="CURRENCY" options={CURRENCIES} />}
                </div>

                {stockAlertType === 'Price' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 fade-in">
                    <SettingBlock label="DIRECTION">
                      <div className="grid grid-cols-2 gap-2">
                        <DirectionBtn label="Above" icon={<ArrowUp size={16} />} active={direction === 'above'} onClick={() => setDirection('above')} />
                        <DirectionBtn label="Below" icon={<ArrowDown size={16} />} active={direction === 'below'} onClick={() => setDirection('below')} />
                      </div>
                    </SettingBlock>
                    <InputBlock label="TARGET PRICE" prefix="$" placeholder="0.00" />
                  </div>
                )}

                {stockAlertType === 'Volatility' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 fade-in">
                    <SettingBlock label="DIRECTION">
                      <div className="grid grid-cols-2 gap-2">
                        <DirectionBtn label="Goes Up" icon={<ArrowUp size={16} />} active={direction === 'above'} onClick={() => setDirection('above')} />
                        <DirectionBtn label="Goes Down" icon={<ArrowDown size={16} />} active={direction === 'below'} onClick={() => setDirection('below')} />
                      </div>
                    </SettingBlock>
                    <InputBlock label="PERCENTAGE CHANGE" suffix="%" placeholder="0.00" />
                  </div>
                )}

                {stockAlertType === 'Periodic' && (
                  <div className="pt-4 max-w-[50%] fade-in">
                    <Dropdown label="TIME INTERVAL" options={INTERVALS} />
                  </div>
                )}
              </div>
            )}


            {/* Notify Via */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-[#737373] uppercase tracking-widest pl-1">NOTIFY VIA</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                <NotifyBtn id="Email" icon={<Mail size={16} />} active={notifyVia.includes('Email')} onClick={toggleNotify} />
                <NotifyBtn id="SMS" icon={<MessageSquare size={16} />} active={notifyVia.includes('SMS')} onClick={toggleNotify} />
                <NotifyBtn id="Telegram" icon={<Send size={16} />} active={notifyVia.includes('Telegram')} onClick={toggleNotify} />
                <NotifyBtn id="Discord" icon={<MessageCircle size={16} />} active={notifyVia.includes('Discord')} onClick={toggleNotify} />
                <NotifyBtn id="Slack" icon={<MessageCircle size={16} />} active={notifyVia.includes('Slack')} onClick={toggleNotify} />
                <NotifyBtn id="Webhook" icon={<Link size={16} />} active={notifyVia.includes('Webhook')} onClick={toggleNotify} />
                <NotifyBtn id="Phone call" icon={<Phone size={16} />} active={notifyVia.includes('Phone call')} onClick={toggleNotify} />
                <NotifyBtn id="Browser" icon={<Monitor size={16} />} active={notifyVia.includes('Browser')} onClick={toggleNotify} />
              </div>
            </div>

            {/* Cooldown and Note */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#737373] uppercase tracking-widest pl-1">COOLDOWN</span>
                <div className="grid grid-cols-4 gap-2">
                  {['5m', '15m', '30m', '1h', '6h', '24h', '7d'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setCooldown(t)}
                      className={`py-2 text-xs font-bold rounded-md border transition-all ${cooldown === t ? 'bg-[#262626] border-[#404040] text-white' : 'bg-[#1a1a1a] border-[#262626] text-[#737373]'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-[#404040] italic pt-1">Wait time between alerts</p>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#737373] uppercase tracking-widest pl-1">NOTE (OPTIONAL)</span>
                <div className="relative">
                  <textarea 
                    placeholder="e.g. ATH breakout watch..."
                    className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg p-4 text-sm text-white focus:outline-none focus:border-[#404040] transition-all resize-none h-24"
                  />
                  <span className="absolute bottom-3 right-3 text-[10px] text-[#404040]">0/100</span>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 flex items-center justify-between border-t border-[#262626]">
              <div className="flex items-center gap-4">
                <div className="relative inline-flex items-center cursor-pointer">
                  <div className="w-10 h-5 bg-[#262626] rounded-full"></div>
                  <div className="absolute left-1 w-3 h-3 bg-white/20 rounded-full transition-all"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">One-time alert</p>
                  <p className="text-[11px] text-[#737373]">Get notified only once when this alert triggers.</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[11px] text-[#404040] font-medium tracking-tight">0 active alerts</span>
                <button className="btn-premium-gradient text-sm px-8 py-3.5">
                  <span>Set alert</span>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Details Section */}
        <TabDetails activeTab={activeTab} stockAlertType={stockAlertType} />
      </div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 nav-floating flex items-center p-1.5 gap-1 shadow-2xl shadow-black">
        <NavTab id="Price" icon={<TrendingUp size={16} />} active={activeTab === 'Price'} onClick={setActiveTab} />
        <NavTab id="Percent" icon={<Percent size={16} />} active={activeTab === 'Percent'} onClick={setActiveTab} />
        <NavTab id="Periodic" icon={<RotateCcw size={16} />} active={activeTab === 'Periodic'} onClick={setActiveTab} />
        <NavTab id="Volume" icon={<BarChart3 size={16} />} active={activeTab === 'Volume'} onClick={setActiveTab} />
        <NavTab id="Funding" icon={<DollarSign size={16} />} active={activeTab === 'Funding'} onClick={setActiveTab} />
        <NavTab id="Marketcap" icon={<PieChart size={16} />} active={activeTab === 'Marketcap'} onClick={setActiveTab} />
        <NavTab id="Dominance" icon={<Globe size={16} />} active={activeTab === 'Dominance'} onClick={setActiveTab} />
        <NavTab id="Stocks" icon={<Grid size={16} />} active={activeTab === 'Stocks'} onClick={setActiveTab} />
      </div>
    </div>
  );
}

function TabDetails({ activeTab, stockAlertType }: { activeTab: string, stockAlertType: string }) {
  const content = {
    Price: {
      title: "About Crypto Price Alerts",
      q1: "How do Crypto Price Alerts work?",
      a1: "Our market monitoring system tracks real-time cryptocurrency prices across all major exchanges. Set an alert when a coin like Bitcoin or Ethereum crosses a specific price threshold, and we'll instantly notify you via your preferred channels.",
      q2: "Supported Exchanges",
      a2: "We aggregate data from leading cryptocurrency exchanges including Binance, Coinbase, Kraken, and KuCoin to ensure you get the most accurate and timely price movements. You can optionally choose to track prices from a specific exchange or use the global average index."
    },
    Percent: {
      title: "About Percentage Price Alerts",
      q1: "How do Percentage Alerts work?",
      a1: "Percentage alerts trigger when a cryptocurrency rises or falls by a customized percentage over a specific timeframe (e.g. 5 minutes, 1 hour, or 1 day). This is ideal for catching sudden market volatility and day trading.",
      q2: "Why use Percentage Alerts?",
      a2: "Instead of tracking a hardcoded price target, percentage alerts help you adapt to current market conditions. It allows traders to catch explosive breakouts or sudden flash crashes regardless of the asset's current baseline price."
    },
    Periodic: {
      title: "About Periodic Price Alerts",
      q1: "What is a Periodic Alert?",
      a1: "Periodic alerts send you regular scheduled updates regarding the current price and status of your chosen cryptocurrency. It essentially acts as a recurring market pulse sent directly to your phone or email.",
      q2: "Common Use Cases",
      a2: "Instead of staring at charts all day, set a periodic alert to receive a daily morning update on Bitcoin's price, or a weekly digest of your favorite altcoin's performance."
    },
    Volume: {
      title: "About Volume Alerts",
      q1: "How does Volume Tracking work?",
      a1: "Volume alerts monitor the 24-hour trading volume of cryptocurrencies. You will receive a notification when the trading volume instantly spikes or drops by a specific multiplier compared to its recent average.",
      q2: "Why track Volume?",
      a2: "Trading volume is a massive indicator of market momentum. A sudden spike in volume often precedes or confirms significant price breakouts, allowing traders to enter positions early."
    },
    Funding: {
      title: "About Funding Rate Alerts",
      q1: "What are perpetual funding rates?",
      a1: "Funding rates are periodic payments made to short or long traders that are calculated based on the difference between perpetual contract markets and spot prices. Highly positive rates mean longs pay shorts, and vice versa.",
      q2: "Why set Funding Alerts?",
      a2: "Funding rates highlight market sentiment and over-leveraged conditions. By receiving alerts when funding rates get too high or low, traders can identify potential market tops, bottoms, or squeeze opportunities."
    },
    Marketcap: {
      title: "About Market Cap Alerts",
      q1: "How are Market Cap alerts triggered?",
      a1: "Market Capitalization is the total circulating supply of a cryptocurrency multiplied by its current price. Our system continuously monitors these valuations. When an asset's market cap exceeds or dips below your specified target, an alert is triggered in real-time.",
      q2: "Total Market Tracking",
      a2: "You can also set alerts for the 'Total Crypto Market Cap' to get notified when the entire industry crosses massive valuation milestones like $2 Trillion or $3 Trillion."
    },
    Dominance: {
      title: "About Bitcoin Dominance Alerts",
      q1: "What is BTC Dominance?",
      a1: "Bitcoin Dominance is the ratio of Bitcoin's market capitalization compared to the total market capitalization of all other cryptocurrencies combined.",
      q2: "Why is it important?",
      a2: "Tracking dominance helps traders identify 'Alt-seasons'. When Bitcoin dominance falls, it usually indicates capital is flowing into altcoins, leading to speculative crypto rallies. Our alerts notify you when critical dominance thresholds are shattered."
    },
    Stocks: {
      title: stockAlertType === 'Price' ? "About Stock Market Alerts" : stockAlertType === 'Volatility' ? "About Stock Volatility Alerts" : "About Periodic Stock Alerts",
      q1: "How do Stock Tracking Alerts work?",
      a1: "We monitor over 10,000+ equities and ETFs listed on major global exchanges like NASDAQ and NYSE. Utilizing real-time institutional data feeds, our platform ensures your alerts execute with ultra-low latency.",
      q2: "Advanced Stock Tools",
      a2: "In addition to simple price targets, our stock tracker supports advanced volatility detection and customizable periodic digests, giving retail investors parity with institutional monitoring systems."
    }
  };

  const curr = content[activeTab as keyof typeof content];
  if (!curr) return null;

  return (
    <div className="mt-16 space-y-6 fade-in max-w-2xl mx-auto text-[#a3a3a3]">
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-[#262626] pb-4">{curr.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-200">{curr.q1}</h3>
          <p className="leading-relaxed text-xs">{curr.a1}</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-200">{curr.q2}</h3>
          <p className="leading-relaxed text-xs">{curr.a2}</p>
        </div>
      </div>
    </div>
  );
}

function TopNavItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center gap-2.5 text-sm font-medium text-[#737373] hover:text-white transition-all group">
      <div className="text-[#737373] group-hover:text-white transition-colors">
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
}

function Dropdown({ label, options }: { label: string, options: {value: string, icon: string}[] }) {
  const [selected, setSelected] = React.useState(options[0]);

  return (
    <div className="space-y-3">
      <span className="text-[10px] font-bold text-[#737373] uppercase tracking-widest pl-1">{label}</span>
      <div className="relative flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border border-[#262626] rounded-lg cursor-pointer hover:border-[#404040] transition-all group">
        <select 
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
          value={selected.value}
          onChange={(e) => {
            const opt = options.find(o => o.value === e.target.value);
            if(opt) setSelected(opt);
          }}
        >
          {options.map((opt, i) => <option key={i} value={opt.value}>{opt.value}</option>)}
        </select>
        <div className="flex items-center gap-3">
          <span className="text-lg">{selected.icon}</span>
          <span className="text-sm font-medium text-white">{selected.value}</span>
        </div>
        <ChevronDown size={14} className="text-[#404040] group-hover:text-white transition-colors" />
      </div>
    </div>
  );
}

function NotifyBtn({ id, icon, active, onClick }: { id: string, icon: React.ReactNode, active: boolean, onClick: (id: string) => void }) {
  return (
    <button 
      onClick={() => onClick(id)}
      className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${active ? 'bg-[#262626] border-[#404040] text-white shadow-lg' : 'bg-[#1a1a1a] border-[#262626] text-[#737373] hover:border-[#404040]'}`}
    >
      {icon}
      <span className="text-[11px] font-semibold">{id}</span>
    </button>
  );
}

function NavTab({ id, icon, active, onClick }: { id: string, icon: React.ReactNode, active: boolean, onClick: (id: string) => void }) {
  return (
    <button 
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all ${active ? 'bg-[#262626] text-white shadow-lg' : 'text-[#737373] hover:text-white'}`}
    >
      {icon}
      <span className="text-sm font-medium">{id}</span>
    </button>
  );
}

function SettingBlock({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <span className="text-[10px] font-bold text-[#737373] uppercase tracking-widest pl-1">{label}</span>
      {children}
    </div>
  );
}

function DirectionBtn({ label, icon, active, onClick }: { label: string, icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${active ? 'bg-[#262626] border-[#404040] text-white' : 'bg-[#1a1a1a] border-[#262626] text-[#737373]'}`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function InputBlock({ label, prefix, suffix, placeholder }: { label: string, prefix?: string, suffix?: string, placeholder?: string }) {
  return (
    <div className="space-y-3">
      <span className="text-[10px] font-bold text-[#737373] uppercase tracking-widest pl-1">{label}</span>
      <div className="relative">
        {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373] font-medium">{prefix}</span>}
        <input 
          type="text" 
          placeholder={placeholder} 
          className={`w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-3 ${prefix ? 'pl-8' : 'pl-4'} ${suffix ? 'pr-20' : 'pr-4'} text-white focus:outline-none focus:border-[#404040] transition-all`}
        />
        {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737373] font-medium text-sm">{suffix}</span>}
      </div>
    </div>
  );
}

export default App;

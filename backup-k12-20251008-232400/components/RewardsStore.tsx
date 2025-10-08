// components/RewardsStore.tsx
import React, { useState } from 'react';
import { User } from '../types';
import { TOKEN_EXCHANGE_RATES } from '../constants';
import { exchangePointsForTokens } from '../services/sscoreService';

interface RewardsStoreProps {
  user: User;
  onUserUpdate: (user: User) => void;
  onClose: () => void;
}

export const RewardsStore: React.FC<RewardsStoreProps> = ({ 
  user, 
  onUserUpdate,
  onClose 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'tokens' | 'features'>('tokens');

  const sscore = user.sscore || 0;
  const aiTokens = user.aiTokens || 0;

  const handleExchangeTokens = async (points: number, tokens: number) => {
    if (sscore < points) {
      setError(`Insufficient S-Score points. You need ${points} but only have ${sscore}.`);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await exchangePointsForTokens(user.id, points, tokens);
      
      if (result.success) {
        // Update user object
        const updatedUser = {
          ...user,
          sscore: result.newSScore,
          aiTokens: result.newTokens,
        };
        onUserUpdate(updatedUser);
        setSuccess(`Successfully exchanged ${points} S-Score for ${tokens} AI tokens!`);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || 'Exchange failed');
      }
    } catch (err) {
      setError('An error occurred during exchange');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tokenPackages = [
    { points: 50, tokens: 10, popular: false },
    { points: 200, tokens: 50, popular: true },
    { points: 500, tokens: 150, popular: false },
    { points: 1000, tokens: 350, popular: false },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Rewards Store</h2>
              <p className="text-purple-100 text-sm">Exchange S-Score for AI Tokens & Features</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* User Balance */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <i className="fas fa-star text-yellow-300 text-lg"></i>
              <span className="font-semibold text-lg">{sscore.toLocaleString()}</span>
              <span className="text-purple-100 text-sm">S-Score</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-coins text-blue-300 text-lg"></i>
              <span className="font-semibold text-lg">{aiTokens}</span>
              <span className="text-purple-100 text-sm">AI Tokens</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
          <button
            onClick={() => setSelectedTab('tokens')}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              selectedTab === 'tokens'
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <i className="fas fa-coins mr-2"></i>
            Token Packages
          </button>
          <button
            onClick={() => setSelectedTab('features')}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              selectedTab === 'features'
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <i className="fas fa-sparkles mr-2"></i>
            AI Features
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Alerts */}
          {error && (
            <div className="mb-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg flex items-center gap-2">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}
          
          {success && (
            <div className="mb-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-center gap-2">
              <i className="fas fa-check-circle"></i>
              <span>{success}</span>
            </div>
          )}

          {/* Token Packages Tab */}
          {selectedTab === 'tokens' && (
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Exchange your S-Score points for AI Tokens to unlock premium AI features.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tokenPackages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className={`relative bg-white dark:bg-slate-700 rounded-xl p-6 border-2 transition-all ${
                      pkg.popular
                        ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                        : 'border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-700'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          BEST VALUE
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-3">
                        <i className="fas fa-coins text-3xl text-blue-600 dark:text-blue-400"></i>
                      </div>
                      <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">
                        {pkg.tokens}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        AI Tokens
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-4">
                      <i className="fas fa-star text-yellow-500"></i>
                      <span className="text-lg font-semibold text-slate-800 dark:text-white">
                        {pkg.points}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        S-Score
                      </span>
                    </div>

                    <button
                      onClick={() => handleExchangeTokens(pkg.points, pkg.tokens)}
                      disabled={loading || sscore < pkg.points}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                        sscore < pkg.points
                          ? 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <i className="fas fa-spinner fa-spin"></i>
                          Processing...
                        </span>
                      ) : sscore < pkg.points ? (
                        'Insufficient S-Score'
                      ) : (
                        'Exchange Now'
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Exchange Rate Info */}
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-0.5"></i>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-1">How to Earn More S-Score:</p>
                    <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                      <li>• Complete lessons (+10 points)</li>
                      <li>• Pass tests (+20 points)</li>
                      <li>• Get perfect quiz scores (+30 points)</li>
                      <li>• Maintain daily login streaks (+5 points/day)</li>
                      <li>• Complete weekly challenges (+50 points)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Features Tab */}
          {selectedTab === 'features' && (
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Use your AI Tokens to access premium features powered by advanced AI.
              </p>
              
              <div className="space-y-4">
                {TOKEN_EXCHANGE_RATES.map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-700 rounded-xl p-5 border border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                          {feature.displayName}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          {feature.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <i className="fas fa-coins text-blue-500"></i>
                          <span className="font-semibold text-slate-800 dark:text-white">
                            {feature.cost}
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            tokens per use
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <button
                          disabled={aiTokens < feature.cost}
                          className={`px-6 py-2 rounded-lg font-medium transition-all ${
                            aiTokens < feature.cost
                              ? 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                              : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg'
                          }`}
                        >
                          Use Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Token Balance Warning */}
              {aiTokens < 50 && (
                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400 mt-0.5"></i>
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <p className="font-medium">Low Token Balance</p>
                      <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                        You're running low on AI tokens. Exchange some S-Score points to continue using premium features.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsStore;

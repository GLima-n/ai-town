import { ServerGame } from '../hooks/serverGame';
import closeImg from '../../assets/close.svg';

export default function AgentManager({
  game,
  onClose,
}: {
  game: ServerGame;
  onClose: () => void;
}) {
  const agents = [...game.world.players.values()].filter((p) => !p.human);

  return (
    <div className="absolute inset-0 bg-brown-900 bg-opacity-95 z-50 flex flex-col p-8 overflow-y-auto text-brown-100 font-body">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl sm:text-6xl font-display text-white tracking-wider">Dashboard do Time</h1>
        <button onClick={onClose} className="button shadow-solid bg-clay-700 p-2 cursor-pointer pointer-events-auto">
          <img src={closeImg} alt="Close" className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pointer-events-auto">
        {agents.map((agent) => {
          const desc = game.playerDescriptions.get(agent.id);
          const isBusy = agent.activity && agent.activity.until > Date.now();
          const activityName = isBusy ? agent.activity?.description : 'Ocioso (Analisando Backlog)';
          
          return (
            <div key={agent.id} className="box bg-brown-800 p-6 shadow-solid flex flex-col gap-4 border-2 border-brown-700">
              <h2 className="text-3xl font-display text-white">{desc?.name}</h2>
              <div className="text-base bg-brown-900 p-2 border border-brown-700">
                <strong className="text-clay-300">Status Atual:</strong> <span className={isBusy ? "text-clay-100" : "text-green-400"}>{activityName}</span>
              </div>
              <div className="text-sm italic opacity-80 mt-2 line-clamp-3">
                {desc?.description}
              </div>
              
              <div className="flex gap-4 mt-auto pt-6">
                <button className="button bg-clay-700 text-white text-sm px-4 py-2 shadow-solid flex-1 hover:bg-clay-600 transition-colors">
                  Ver Tarefas
                </button>
                <button className="button bg-clay-700 text-white text-sm px-4 py-2 shadow-solid flex-1 hover:bg-clay-600 transition-colors">
                  Agendar Reunião
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {agents.length === 0 && (
        <div className="text-center text-2xl mt-12 opacity-50">
          Nenhum agente encontrado. Certifique-se de iniciar o banco de dados.
        </div>
      )}
    </div>
  );
}

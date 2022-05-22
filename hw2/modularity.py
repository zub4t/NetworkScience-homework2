import networkx as nx
import networkx.algorithms.community as nx_comm
import matplotlib.pyplot as plt
G = nx.read_gml("movies/starwars_v.gml")
print("Name of the movie: Star Wars V")
print("Number of nodes: " + str(G.number_of_nodes()))
print("Number of edges: " + str(G.number_of_edges()))
louvain_comms = nx_comm.louvain_communities(G, weight="weight", seed=1233)
number_communities = len(louvain_comms)


def getCommunityFromName(name):
  for x in range(number_communities - 1):
      if(name in louvain_comms[x]):
        return x

A = nx.to_numpy_matrix(G)

modularity = 0

i = 0
for u in G.nodes():
    j = 0
    for v in G.nodes():
        ki = G.degree(u)
        kj = G.degree(v)
        aij = A.item((i, j))
        m = G.number_of_edges()
        modularity = modularity + ((aij - ((ki*kj)/(2*m))) * (1 if getCommunityFromName(u) == getCommunityFromName(v) else 0))
        j = j + 1
    i = i + 1
modularity = modularity / (2 * G.number_of_edges())

print("Supposed modularity = " + str(nx_comm.modularity(G, louvain_comms)))
print("Our Modularity = " + str(modularity))
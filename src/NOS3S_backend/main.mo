import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Types "Types";

actor {
  
  private stable var users: [Types.User] = [];
  private stable var owner: Principal = Principal.fromText("2vxsx-fae");
  
  // Register user with group name
  public shared(msg) func register(groupName: Types.GroupName): async Bool {
    let caller = msg.caller;
    for (user in users.vals()) {
      if (user.principal == caller) {
        return false;
      };
    };
    users := Array.append(users, [{
      principal = caller;
      group = groupName;
      points = 0;
      hrv = []
    }]);
    Debug.print("Nuevo usuario: " # Principal.toText(caller));
    return true;
  };
  
  // Calculate stress level based on RMSSD value
  private func calculateStressScore(rmssd: Types.Rmssd): Types.StressLevel {
    if (rmssd > 50) {
      return "Low Stress";
    } else if (rmssd >= 30 and rmssd <= 50) {
      return "Medium Stress";
    } else {
      return "High Stress";
    };
  };
  
  // Add HRV data with better parameter names
  public shared(msg) func addHrvData(
    rmssd: Types.Rmssd,
    surroundingsRating: Types.SurroundingsRating,
    selfRating: Types.SelfRating,
    interactionRating: Types.InteractionRating,
    placeRating: Types.PlaceRating,
    technologyRating: Types.TechnologyRating
  ): async Bool {
    let principal = msg.caller;
    var index: ?Nat = null;
    
    for (i in users.keys()) {
      if (users[i].principal == principal) {
        index := ?i;
      };
    };
    
    switch (index) {
      case null {
        Debug.print("Usuario no registrado: " # Principal.toText(principal));
        return false;
      };
      case (?i) {
        let stressLevel = calculateStressScore(rmssd);
        var prev: ?Types.StressLevel = null;
        if (users[i].hrv.size() > 0) {
          let last = users[i].hrv[users[i].hrv.size() - 1];
          prev := ?last.stress;
        };
        
        var pointsEarned: Types.Points = 0;
        switch (prev) {
          case (?prevLevel) {
            if (prevLevel == "High Stress" and (stressLevel == "Medium Stress" or stressLevel == "Low Stress")) {
              pointsEarned := 10;
            } else if (prevLevel == "Medium Stress" and stressLevel == "Low Stress") {
              pointsEarned := 5;
            };
          };
          case null {};
        };
        
        let newUser = {
          principal = users[i].principal;
          group = users[i].group;
          points = users[i].points + pointsEarned;
          hrv = Array.append(users[i].hrv, [{
            timestamp = Time.now();
            rmssd = rmssd;
            surroundings = surroundingsRating;
            self = selfRating;
            interaction = interactionRating;
            place = placeRating;
            technology = technologyRating;
            stress = stressLevel
          }]);
        };
        
        users := Array.tabulate<Types.User>(users.size(), func(j) {
          if (j == i) { newUser } else { users[j] }
        });
        
        Debug.print("Puntos ganados: " # debug_show(pointsEarned));
        return true;
      };
    };
  };
  
  // Alternative method using a record for even cleaner interface
  public shared(msg) func addHrvRecord(hrvData: Types.HrvData): async Bool {
    return await addHrvData(
      hrvData.rmssd,
      hrvData.surroundings,
      hrvData.self,
      hrvData.interaction,
      hrvData.place,
      hrvData.technology
    );
  };
  
  // Get current user data
  public shared query(msg) func getUser(): async ?Types.User {
    let caller = msg.caller;
    for (user in users.vals()) {
      if (user.principal == caller) {
        return ?user;
      };
    };
    return null;
  };
  
  // Get user points
  public shared query(msg) func getPoints(): async ?Types.Points {
    let caller = msg.caller;
    for (user in users.vals()) {
      if (user.principal == caller) {
        return ?user.points;
      };
    };
    return null;
  };
  
  // Get feedback based on stress level
  public query func getStressFeedback(stressLevel: Types.StressLevel): async Text {
    switch (stressLevel) {
      case "Low Stress" {
        return "Excelente. Sigue así.";
      };
      case "Medium Stress" {
        return "Puedes mejorar. Prueba meditación.";
      };
      case "High Stress" {
        return "Alerta. Busca ayuda o respira profundo.";
      };
      case _ {
        return "No se puede dar feedback.";
      };
    };
  };
  
  // Get owner principal
  public query func getOwner(): async Principal {
    return owner;
  };
  
  // Check if caller is owner
  public shared(msg) func isOwner(): async Bool {
    return msg.caller == owner;
  };
  
}
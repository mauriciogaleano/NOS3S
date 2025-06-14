module Types {
  
  // Basic types with better naming
  public type Rmssd = Nat;
  public type SurroundingsRating = Nat;
  public type SelfRating = Nat;
  public type InteractionRating = Nat;
  public type PlaceRating = Nat;
  public type TechnologyRating = Nat;
  public type StressLevel = Text;
  public type GroupName = Text;
  public type Points = Nat;
  
  // Record types for better structure
  public type HrvData = {
    rmssd: Rmssd;
    surroundings: SurroundingsRating;
    self: SelfRating;
    interaction: InteractionRating;
    place: PlaceRating;
    technology: TechnologyRating;
  };
  
  public type HrvEntry = {
    timestamp: Int;
    rmssd: Rmssd;
    surroundings: SurroundingsRating;
    self: SelfRating;
    interaction: InteractionRating;
    place: PlaceRating;
    technology: TechnologyRating;
    stress: StressLevel;
  };
  
  public type User = {
    principal: Principal;
    group: GroupName;
    points: Points;
    hrv: [HrvEntry];
  };
  
}
